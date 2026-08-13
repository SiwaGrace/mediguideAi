import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from config import settings
from router import SkillRouter
from skills import load_skills, Skill
from llm import api_key_is_set, get_ai_response
from chat import (
    EMERGENCY_RESPONSE,
    SERVICE_UNAVAILABLE,
    _small_talk_offline,
    _clean_input,
)

# Initialize FastAPI app
app = FastAPI(title="MediGuide AI API", description="FastAPI layer for MediGuide AI chatbot")

# Enable CORS for frontend local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",          
        "https://mediguide-ai-omega.vercel.app",   
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load skills and initialize the router globally at startup
skills_list = load_skills()
router = SkillRouter(skills_list)

class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []

class ChatResponse(BaseModel):
    urgency: str
    title: str
    response: str
    recommendations: List[str]
    followUpQuestions: List[str]
    suggestedActions: List[str]

class HealthResponse(BaseModel):
    status: str
    openrouter_api_key_configured: bool
    model: str
    skills_loaded: int

@app.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint that reports if OpenRouter API Key is configured."""
    return HealthResponse(
        status="ok",
        openrouter_api_key_configured=api_key_is_set(),
        model=settings.OPENROUTER_MODEL,
        skills_loaded=len(skills_list),
    )

def get_offline_response(skill: Optional[Skill], user_message: str) -> Dict[str, Any]:
    """Generates structured response when LLM/API key is unavailable or fails."""
    if skill is not None and skill.skill_id != "ai_dynamic_health_guidance":
        recommendations = []
        if skill.escalation_contact and skill.escalation_contact != "N/A":
            recommendations.append(f"Escalation contact: {skill.escalation_contact}")
        
        # Decide urgency
        urgency = "Medium"
        if skill.skill_id in {"emergency_triage"}:
            urgency = "High"
        elif skill.skill_id in {"small_talk", "clinic_finder"}:
            urgency = "Low"
            
        suggested_actions = []
        if skill.skill_id in {"clinic_finder", "malaria_guidance", "general_symptom_triage"}:
            suggested_actions.append("Find Nearby Clinics")
            
        return {
            "urgency": urgency,
            "title": skill.skill_name,
            "response": skill.response_action,
            "recommendations": recommendations,
            "followUpQuestions": [],
            "suggestedActions": suggested_actions,
        }
        
    return {
        "urgency": "Medium",
        "title": "Service Offline",
        "response": SERVICE_UNAVAILABLE,
        "recommendations": [],
        "followUpQuestions": [],
        "suggestedActions": ["Find Nearby Clinics"],
    }

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    """Exposes MediGuide AI routing and LLM/offline responses over HTTP."""
    user_message = _clean_input(payload.message)
    if not user_message:
        raise HTTPException(status_code=400, detail="Empty message is not allowed.")
        
    history = payload.history
    
    # Route message to find the active skill
    skill = router.route(user_message)
    
    # Stateful history clearing simulation:
    # If the current skill differs from the skill of the last user interaction in the history,
    # reset the history for context to avoid mixing unrelated topics in LLM conversation.
    last_user_message = None
    for msg in reversed(history):
        if msg.get("role") == "user":
            last_user_message = msg.get("content", "")
            break
            
    if last_user_message and skill:
        last_skill = router.route(last_user_message)
        if last_skill and last_skill.skill_id != skill.skill_id:
            history = []
            
    # 1. Emergency short-circuit
    if skill is not None and skill.skill_id == "emergency_triage":
        return ChatResponse(
            urgency="High",
            title="Emergency Alert",
            response=EMERGENCY_RESPONSE,
            recommendations=[
                "Go to the nearest 24/7 emergency room immediately (e.g. Ridge Regional Hospital, St. Jude General Hospital).",
                "Call the local emergency number immediately.",
                "Do not travel alone.",
                "This assistant cannot diagnose or treat emergencies.",
            ],
            followUpQuestions=[],
            suggestedActions=["Find Nearby Clinics"],
        )
        
    # 2. Greeting/Small Talk Offline Flow
    if skill is not None and skill.skill_id == "small_talk":
        if not api_key_is_set():
            return ChatResponse(
                urgency="Low",
                title="Greetings",
                response=_small_talk_offline(user_message),
                recommendations=[],
                followUpQuestions=[],
                suggestedActions=[],
            )
            
    # 3. Offline Mode Flow (No key configured)
    if not api_key_is_set():
        offline_data = get_offline_response(skill, user_message)
        return ChatResponse(**offline_data)
        
    # 4. Online Mode Flow (Get response from OpenRouter/LLM)
    try:
        data = get_ai_response(skill, history, user_message)
        
        # Ensure correct JSON structure keys
        return ChatResponse(
            urgency=data.get("urgency", "Low"),
            title=data.get("title", "Response"),
            response=data.get("response", ""),
            recommendations=data.get("recommendations", []),
            followUpQuestions=data.get("followUpQuestions", []),
            suggestedActions=data.get("suggestedActions", []),
        )
    except Exception as e:
        # Fallback to offline guidance on API errors / timeouts
        offline_data = get_offline_response(skill, user_message)
        return ChatResponse(**offline_data)

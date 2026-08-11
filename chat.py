import random
import re

from router import SkillRouter
from skills import Skill, load_skills
from config import settings
from llm import api_key_is_set, get_ai_response

MAX_HISTORY_TURNS = 6

EMERGENCY_RESPONSE = (
    "URGENT - HIGH: Your message describes a possible life-threatening emergency. "
    "Do not wait. Go to the nearest 24/7 emergency room immediately (e.g. Ridge Regional Hospital, "
    "St. Jude General Hospital) or call the local emergency number. Do not travel alone. "
    "This assistant cannot diagnose or treat emergencies."
)

SMALL_TALK_RESPONSES = [
    "Hi there! What health question can I help you with today?",
    "Hello! How can I help? I can offer guidance on symptoms, malaria, hypertension, "
    "pregnancy care, or finding a nearby clinic.",
    "Hey! Feel free to ask me about any symptoms, health concerns, or finding a clinic near you.",
]

THANKS_RESPONSES = [
    "You're welcome! Is there anything else I can help you with?",
    "Happy to help! Let me know if you have any other health questions.",
]

GOODBYE_RESPONSES = [
    "Take care and stay healthy!",
    "Goodbye! Feel free to come back any time you need health guidance.",
]

SERVICE_UNAVAILABLE = (
    "Service Temporarily Unavailable. Please try again shortly. You can also use the "
    "Nearby Clinics search panel to find a healthcare facility nearby."
)


def run_chat():
    skills = load_skills()
    router = SkillRouter(skills)
    history: list[dict] = []
    last_skill_id: str | None = None

    print("MediGuide AI - chat (type 'exit' or 'quit' to stop)")
    print("-" * 40)
    if not api_key_is_set():
        print("NOTE: no OpenRouter API key configured - offline skill guidance only.")
        print("-" * 40)

    while True:
        try:
            user_message = _clean_input(input("You: "))
        except EOFError:
            print()
            break

        if not user_message:
            continue
        if user_message.lower() in {"exit", "quit"}:
            print("Goodbye. Stay healthy!")
            break

        skill = router.route(user_message)
        if last_skill_id is not None and skill is not None and skill.skill_id != last_skill_id:
            history.clear()
        _handle_message(skill, user_message, history, router)
        if skill is not None:
            last_skill_id = skill.skill_id


def _clean_input(raw: str) -> str:
    text = raw.replace("\ufeff", "").replace("\u200b", "").strip()
    return text.strip()


def _small_talk_offline(user_message: str) -> str:
    text = user_message.lower()
    if re.search(r"\b(thanks|thank you|ty)\b", text):
        return random.choice(THANKS_RESPONSES)
    if re.search(r"\b(bye|goodbye|see you|good night)\b", text):
        return random.choice(GOODBYE_RESPONSES)
    return random.choice(SMALL_TALK_RESPONSES)


def _handle_message(skill: Skill | None, user_message: str, history: list[dict], router: SkillRouter):
    if skill is not None and skill.skill_id == "emergency_triage":
        print(f"\n{EMERGENCY_RESPONSE}\n")
        return

    if skill is not None and skill.skill_id == "small_talk":
        if not api_key_is_set():
            print(f"\n{_small_talk_offline(user_message)}\n")
            return

    if not api_key_is_set():
        _offline_fallback(skill, user_message)
        return

    data = None
    try:
        data = get_ai_response(skill, history, user_message)
        _render(data)
    except Exception:
        _offline_fallback(skill, user_message)

    if data is not None:
        history.append({"role": "user", "content": user_message})
        history.append({"role": "assistant", "content": _assistant_text(data)})
        if len(history) > MAX_HISTORY_TURNS * 2:
            del history[: len(history) - MAX_HISTORY_TURNS * 2]


def _assistant_text(data: dict) -> str:
    title = data.get("title", "")
    response = data.get("response", "")
    return f"{title}\n{response}" if title else response


def _render(data: dict):
    urgency = data.get("urgency", "")
    title = data.get("title", "")
    response = data.get("response", "")
    recommendations = data.get("recommendations", [])
    follow_ups = data.get("followUpQuestions", [])
    actions = data.get("suggestedActions", [])

    badge = f"[{urgency}]" if urgency else ""
    print(f"\n{badge} {title}".strip())
    print("-" * 40)
    if response:
        print(response)
    if recommendations:
        print("\nRecommendations:")
        for i, item in enumerate(recommendations, 1):
            print(f"  {i}. {item}")
    if actions:
        print("\nSuggested next steps:")
        for item in actions:
            print(f"  - {item}")
    if follow_ups:
        print(f"\nFollow-up questions: {' '.join(follow_ups)}")
    print()


def _offline_fallback(skill: Skill | None, user_message: str):
    if skill is not None and skill.skill_id != "ai_dynamic_health_guidance":
        print(f"\n[{skill.skill_name}]")
        print(f"{skill.response_action}\n")
        if skill.escalation_contact and skill.escalation_contact != "N/A":
            print(f"Escalation: {skill.escalation_contact}\n")
        return
    print(f"\n{SERVICE_UNAVAILABLE}\n")

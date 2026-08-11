# MediGuide AI — Skills & Knowledge Base

This document defines the complete skill catalog for the MediGuide AI chatbot. Each skill maps trigger keywords to a response action, required data, and escalation contact. This file is the primary knowledge source for both the offline skill-routing engine and future RAG indexing.

## Global Safety & Scope Guardrails

- Never diagnose a specific disease.
- Never prescribe medication dosages.
- Never claim certainty.
- Always encourage professional care for serious symptoms.
- Use simple, beginner-friendly language.
- Always classify urgency as Low / Medium / High.
- Explicitly state the bot cannot diagnose or treat emergencies.

---

## 1. Emergency Symptom Detection (Safety-Critical)

- **skill_id:** `emergency_triage`
- **category:** Safety-Critical
- **trigger_keywords:** chest pain, heart attack, breathing, breath, suffocating, unconscious, passed out, bleeding heavily, severe bleed, poison, stroke, numbness one side, speech slur, suicidal

**Description:** Detect life-threatening symptoms and immediately direct the user to emergency care instead of general guidance.

**Sample user queries:**
- "I have chest pain"
- "I can't breathe"
- "I think I'm having a stroke"
- "My friend is unconscious"

**Response action:**
1. Classify urgency as **High**.
2. Display a critical warning.
3. Instruct the user to go to the nearest 24/7 emergency room immediately.
4. Call ambulance / local emergency number.
5. Do not travel alone.
6. Explicitly state the bot cannot diagnose or treat emergencies.

**Data required:** User's location (for nearest ER), description of symptom onset.

**Escalation contact:** Nearest 24/7 ER (e.g. Ridge Regional Hospital, St. Jude General Hospital) / local emergency number.

---

## 2. Headache Self-Care Guidance (Symptom Guidance)

- **skill_id:** `headache_guidance`
- **category:** Symptom Guidance
- **trigger_keywords:** headache

**Description:** Provide preliminary self-care guidance for non-emergency headaches, with escalation criteria for red flags.

**Sample user queries:**
- "I have a headache"
- "My head hurts"

**Response action:**
- Suggest hydration, rest in a dark/quiet room, cold/warm compress, relaxation techniques.
- Flag that a sudden severe "worst headache of life" with fever, neck stiffness, confusion, or slurred speech needs immediate care.

**Data required:** None required; optional symptom duration/severity.

**Escalation contact:** Nearby clinic/pharmacy if symptoms persist or worsen.

---

## 3. Find Nearby Clinics / Hospitals (Healthcare Access)

- **skill_id:** `clinic_finder`
- **category:** Healthcare Access
- **trigger_keywords:** find nearby clinics, clinic, hospital

**Description:** Help the user locate nearby verified healthcare facilities based on their location.

**Sample user queries:**
- "Find a clinic near me"
- "Where's the nearest hospital?"
- "I need a doctor"

**Response action:**
- List nearby clinics/hospitals with distance and specialty (e.g. 24/7 emergency, outpatient, rapid testing).
- Offer to open the interactive Clinics Map Directory to filter by distance/rating/emergency status.

**Data required:** User's current location.

**Escalation contact:** N/A — self-service directory.

---

## 4. Hypertension Education (Health Education)

- **skill_id:** `hypertension_education`
- **category:** Health Education
- **trigger_keywords:** hypertension, high blood pressure

**Description:** Educate the user on hypertension: what it is, why it's dangerous, causes, and initial management.

**Sample user queries:**
- "What is hypertension?"
- "Tell me about high blood pressure"

**Response action:**
- Explain hypertension as a "silent" chronic condition.
- List common causes (diet, inactivity, stress, smoking, genetics, obesity).
- Suggest a DASH-style diet, daily walking, and regular BP checks.
- Offer the full article and a BP-check reminder.

**Data required:** None.

**Escalation contact:** Clinic for BP monitoring / GP for diagnosis and treatment.

---

## 5. Pregnancy / Prenatal Care Guidance (Health Education)

- **skill_id:** `pregnancy_care_guidance`
- **category:** Health Education
- **trigger_keywords:** pregnancy, pregnant

**Description:** Provide prenatal care guidance and flag urgent warning signs during pregnancy.

**Sample user queries:**
- "I'm pregnant, what should I do?"
- "Pregnancy care tips"

**Response action:**
- Recommend folic acid/iron supplements, balanced nutrition, early prenatal clinic registration, and adequate rest.
- List urgent signs (bleeding, severe cramping, continuous headaches, blurred vision) requiring immediate OB-GYN or maternity ER visit.

**Data required:** None; optional trimester/stage of pregnancy.

**Escalation contact:** OB-GYN or nearest maternity emergency department (for urgent signs).

---

## 6. Malaria Information & Guidance (Symptom Guidance)

- **skill_id:** `malaria_guidance`
- **category:** Symptom Guidance
- **trigger_keywords:** malaria

**Description:** Educate the user on malaria symptoms, testing, treatment, and prevention.

**Sample user queries:**
- "I think I have malaria"
- "What are malaria symptoms?"

**Response action:**
- Explain malaria transmission and symptoms.
- Advise getting a Rapid Diagnostic Test (RDT) rather than self-medicating.
- Follow prescribed ACT therapy if positive; rehydrate.
- Recommend insecticide-treated nets and removing stagnant water for prevention.

**Data required:** None.

**Escalation contact:** Clinic/pharmacy offering RDT (Rapid Diagnostic Test).

---

## 7. General Symptom Triage — Fallback (Symptom Guidance)

- **skill_id:** `general_symptom_triage`
- **category:** Symptom Guidance
- **trigger_keywords:** fever, vomiting, diarrhea, coughing, burn, sprain, broken bone, fracture, dog bite, infection, stomach ache, abdominal pain, abdominal, severe headache

**Description:** Provide general Medium/Low urgency guidance for symptoms not covered by a specific dedicated skill.

**Sample user queries:**
- "I have a fever and vomiting"
- "My stomach hurts"
- "I got a dog bite"

**Response action:**
1. Classify urgency (Medium/Low) based on keyword match.
2. Advise monitoring symptoms and symptomatic relief (rest, fluids).
3. Advise avoiding self-prescribing antibiotics/antimalarials.
4. Consult a GP if symptoms persist 24–48 hrs.
5. Offer clinics directory or education library.

**Data required:** Description of symptoms, duration.

**Escalation contact:** GP / nearby clinic if symptoms persist or worsen.

---

## 8. AI-Generated Health Guidance — Core AI Engine

- **skill_id:** `ai_dynamic_health_guidance`
- **category:** Core AI Engine
- **trigger:** Fallback for any message not matched by offline trees, when API key is configured.

**Description:** Primary online path: sends user message + conversation history to the model (via OpenRouter) for a structured, context-aware healthcare guidance response.

**Response action:**
1. Call the OpenRouter API with the system prompt enforcing safety rules.
2. Return structured JSON: `urgency`, `title`, `response`, `followUpQuestions`, `recommendations`, `suggestedActions`.
3. Format into a chat reply with numbered recommendations and follow-up questions.

**Data required:** User message, conversation history, valid API key.

**Escalation:** Falls back to offline diagnostic trees or a "Service Temporarily Unavailable" message on API failure.

---

## 9. API Unavailable Fallback (System / Reliability)

- **skill_id:** `api_fallback_notice`
- **category:** System / Reliability
- **trigger:** Triggered automatically on API error, missing key, rate limit after retries, or server error.

**Description:** Inform the user gracefully when the AI backend is unreachable, and redirect to safe alternatives.

**Response action:**
1. Return a Medium urgency "Service Temporarily Unavailable" message.
2. Recommend verifying API key config, restarting the dev server (for devs), or using the Nearby Clinics panel.
3. Retry failed requests up to 3x with exponential backoff for rate-limit/server errors first.

**Data required:** None (system-level).

**Escalation contact:** Nearby Clinics search panel.

---

## Skill Routing Summary

| skill_id | name | category | urgency class |
|---|---|---|---|
| `emergency_triage` | Emergency Symptom Detection | Safety-Critical | High |
| `headache_guidance` | Headache Self-Care Guidance | Symptom Guidance | Low/Medium |
| `clinic_finder` | Find Nearby Clinics / Hospitals | Healthcare Access | N/A |
| `hypertension_education` | Hypertension Education | Health Education | Low |
| `pregnancy_care_guidance` | Pregnancy / Prenatal Care Guidance | Health Education | Variable |
| `malaria_guidance` | Malaria Information & Guidance | Symptom Guidance | Medium |
| `general_symptom_triage` | General Symptom Triage (Fallback) | Symptom Guidance | Medium/Low |
| `ai_dynamic_health_guidance` | AI-Generated Health Guidance | Core AI Engine | Variable |
| `api_fallback_notice` | API Unavailable Fallback | System/Reliability | Medium |
| `safety_guardrails` | Safety & Scope Guardrails | Safety-Critical | Always applied |

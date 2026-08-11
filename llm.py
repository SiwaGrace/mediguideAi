import json
import re
import time

from openai import (
    APIConnectionError,
    APITimeoutError,
    InternalServerError,
    OpenAI,
    RateLimitError,
)

from config import settings
from skills import Skill

MAX_RETRIES = 3
BACKOFF_SECONDS = [1, 2, 4]

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

RETRIABLE_ERRORS = (RateLimitError, InternalServerError, APIConnectionError, APITimeoutError)


def api_key_is_set() -> bool:
    key = settings.OPENROUTER_API_KEY
    return bool(key) and not key.startswith("your_")


def _load_system_prompt() -> str:
    return settings.SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")


def _build_messages(skill: Skill | None, history: list[dict]) -> list[dict]:
    system = _load_system_prompt()
    if skill is not None and skill.skill_id != "ai_dynamic_health_guidance":
        system += (
            f"\n\n## Active skill context\n"
            f"Matched skill: {skill.skill_name}\n"
            f"Category: {skill.category}\n"
            f"Description: {skill.description}\n\n"
            f"Guidance to follow:\n{skill.response_action}\n\n"
            f"Escalation contact: {skill.escalation_contact}"
        )
    else:
        system += (
            f"\n\n## Active skill context\n"
            f"No specific skill matched this message. It may be a greeting, "
            f"small talk, an unclear message, or a genuine health question "
            f"outside the fixed skill list. Do not assume it describes a "
            f"symptom. Judge from the message itself whether it is "
            f"health-related, and follow Core rule 10 if it is not."
        )
    return [{"role": "system", "content": system}, *history]


def _extract_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text).strip()
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("no JSON object found in response")
    return json.loads(match.group(0))


def get_ai_response(skill: Skill | None, history: list[dict], user_message: str) -> dict:
    messages = _build_messages(skill, history)
    messages.append({"role": "user", "content": user_message})
    last_error = None

    for attempt in range(MAX_RETRIES):
        try:
            completion = client.chat.completions.create(
                model=settings.OPENROUTER_MODEL,
                messages=messages,
                temperature=0.3,
                response_format={"type": "json_object"},
            )
            content = completion.choices[0].message.content or "{}"
            return _extract_json(content)
        except RETRIABLE_ERRORS as exc:
            last_error = exc
            if attempt < MAX_RETRIES - 1:
                time.sleep(BACKOFF_SECONDS[attempt])
        except Exception as exc:
            raise exc

    raise last_error or RuntimeError("OpenRouter request failed")

import sys

from config import settings
from router import SkillRouter
from skills import load_skills


def main():
    api_key_configured = bool(settings.OPENROUTER_API_KEY)
    model = settings.OPENROUTER_MODEL

    print("MediGuide AI - startup")
    print("=" * 40)
    print(f"Model (OpenRouter): {model}")
    print(f"API key configured: {'yes' if api_key_configured else 'no'}")

    skills = load_skills()
    print(f"Skills loaded: {len(skills)}")

    router = SkillRouter(skills)
    print(f"Router ready (fallback: {router.fallback.skill_id if router.fallback else 'none'})")

    if not api_key_configured:
        print("WARNING: OPENROUTER_API_KEY is missing in .env. Chat will be unavailable.")

    if len(sys.argv) > 1:
        if sys.argv[1] == "demo":
            _run_demo(router)
        elif sys.argv[1] == "chat":
            _run_chat()
        else:
            print("Usage: uv run main.py [chat|demo]")
            return

    print("=" * 40)
    print("Chat engine ready. Run 'uv run main.py chat' to start chatting.")


def _run_chat():
    from chat import run_chat

    run_chat()


def _run_demo(router: SkillRouter):
    queries = [
        "I have chest pain and can't breathe",
        "my head hurts a little",
        "find a clinic near me",
        "what is hypertension?",
        "I think I have malaria",
        "I've had a fever for two days",
        "what are some diet tips?",
        "hello",
        "how are you? am just having some headaches",
        "hi, I think I have malaria",
        "I have chest pain, how are you doing",
        "headaches",
    ]
    print("\nROUTER DEMO")
    print("-" * 40)
    for query in queries:
        skill = router.route(query)
        name = skill.skill_name if skill else "none"
        print(f"  '{query}' -> {name}")
    print("-" * 40)


if __name__ == "__main__":
    main()

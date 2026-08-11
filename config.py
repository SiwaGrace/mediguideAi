from pathlib import Path

from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")


class Settings:
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_MODEL: str = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    SKILLS_CSV_PATH: Path = BASE_DIR / "mediguide_skills.csv"
    SKILL_MD_PATH: Path = BASE_DIR / "skill.md"
    SYSTEM_PROMPT_PATH: Path = BASE_DIR / "system_prompt.md"


settings = Settings()

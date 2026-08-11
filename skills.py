from dataclasses import dataclass, field

import pandas as pd

from config import settings


@dataclass
class Skill:
    skill_id: str
    skill_name: str
    category: str
    trigger_keywords: list[str] = field(default_factory=list)
    description: str = ""
    sample_user_queries: list[str] = field(default_factory=list)
    response_action: str = ""
    data_required: str = ""
    escalation_contact: str = ""

    @property
    def matches(self) -> list[str]:
        return self.trigger_keywords + self.sample_user_queries


def load_skills(csv_path: str | None = None) -> list[Skill]:
    path = csv_path or str(settings.SKILLS_CSV_PATH)
    df = pd.read_csv(path)

    def clean(value) -> str:
        if pd.isna(value):
            return ""
        return str(value).strip().strip('"')

    def split_keywords(value) -> list[str]:
        return [part.strip().strip('"') for part in clean(value).split(",") if part.strip()]

    def split_queries(value) -> list[str]:
        return [part.strip().strip('"') for part in clean(value).split("|") if part.strip()]

    skills = []
    for _, row in df.iterrows():
        skills.append(
            Skill(
                skill_id=clean(row["skill_id"]),
                skill_name=clean(row["skill_name"]),
                category=clean(row["category"]),
                trigger_keywords=split_keywords(row["trigger_keywords"]),
                description=clean(row["description"]),
                sample_user_queries=split_queries(row["sample_user_queries"]),
                response_action=clean(row["response_action"]),
                data_required=clean(row["data_required"]),
                escalation_contact=clean(row["escalation_contact"]),
            )
        )
    return skills

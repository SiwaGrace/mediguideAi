import re

from skills import Skill

GREETING_PATTERN = re.compile(
    r"\b(hi|hello|hey|yo|how('s| is) it going|how are you( doing)?|"
    r"good (morning|afternoon|evening)|what'?s up|what are you up to|"
    r"thanks|thank you|thanks a lot|thank you so much|bye|goodbye|"
    r"see you|welcome)\b",
    re.IGNORECASE,
)


class SkillRouter:
    EMERGENCY_SKILL_IDS = {"emergency_triage"}
    SKILL_TO_SKIP = {"ai_dynamic_health_guidance"}

    def __init__(self, skills: list[Skill]):
        self.skills = skills
        self.fallback = self._find("ai_dynamic_health_guidance")
        self.small_talk = Skill(
            skill_id="small_talk",
            skill_name="Greeting / Small Talk",
            category="Small Talk",
            description="Pure greeting or small talk with no health content.",
            response_action=(
                "Greet the user warmly in one or two short sentences and invite "
                "them to share their health question or concern."
            ),
        )

    def _find(self, skill_id: str) -> Skill | None:
        for skill in self.skills:
            if skill.skill_id == skill_id:
                return skill
        return None

    def route(self, user_message: str) -> Skill | None:
        text = user_message.replace("\ufeff", "").replace("\u200b", "").strip()
        if not text:
            return None

        best_skill = None
        best_score = 0.0

        for skill in self.skills:
            if skill.skill_id in self.SKILL_TO_SKIP:
                continue
            score = self._score(skill, text)
            if score <= 0:
                continue
            if skill.skill_id in self.EMERGENCY_SKILL_IDS:
                return skill
            if score > best_score:
                best_score = score
                best_skill = skill

        if best_skill is not None:
            return best_skill

        if GREETING_PATTERN.search(text):
            return self.small_talk

        return self.fallback

    def _score(self, skill: Skill, text: str) -> float:
        score = 0.0
        for keyword in skill.trigger_keywords:
            if self._keyword_in_text(keyword, text):
                score += self._keyword_weight(keyword)
        for query in skill.sample_user_queries:
            if self._keyword_in_text(query, text):
                score += 1.0
        return score

    @staticmethod
    def _keyword_weight(keyword: str) -> float:
        words = keyword.split()
        weight = 1.0 + 0.5 * (len(words) - 1)
        if len(keyword) > 8:
            weight += 0.25
        return weight

    @staticmethod
    def _keyword_in_text(keyword: str, text: str) -> bool:
        keyword = keyword.lower().strip()
        if not keyword or keyword.startswith("("):
            return False
        pattern = r"\b" + re.escape(keyword) + r"\w*"
        return re.search(pattern, text, re.IGNORECASE) is not None

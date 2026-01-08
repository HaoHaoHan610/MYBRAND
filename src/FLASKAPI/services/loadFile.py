from agent.models import PersonalProfile, PotentialAnalysis
from pathlib import Path
import json

# Get the directory where this file is located (FLASKAPI directory)
BASE_DIR = Path(__file__).parent.parent
POTENTIAL_PATH = BASE_DIR / "data" / "potential.json"

def save_potential(potential: PotentialAnalysis) -> None:
    POTENTIAL_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = potential.model_dump()  # Pydantic v2
    POTENTIAL_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def load_potential() -> "PotentialAnalysis":
    if not POTENTIAL_PATH.exists():
        return PotentialAnalysis()  # default rỗng
    data = json.loads(POTENTIAL_PATH.read_text(encoding="utf-8"))
    return PotentialAnalysis.model_validate(data)  # Pydantic v2


PERSONALITY_PATH = BASE_DIR / "data" / "personality.json"

def save_personality(personality: PersonalProfile) -> None:
    PERSONALITY_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = personality.model_dump()  # Pydantic v2
    PERSONALITY_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def load_personality() -> "PersonalProfile":
    if not PERSONALITY_PATH.exists():
        return PersonalProfile()  # default rỗng
    data = json.loads(PERSONALITY_PATH.read_text(encoding="utf-8"))
    return PersonalProfile.model_validate(data)  # Pydantic v2


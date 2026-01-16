
from typing import List, Dict, Any, Optional
from google.genai.types import ProactivityConfig
from httpx import options
from langchain_core import messages
from pydantic import BaseModel
from openai import OpenAI
import os

from pydantic_core.core_schema import bool_schema, list_schema, none_schema # Define field as annotated attributes

class PotentialAnalysis(BaseModel):
    major: Optional[str] = None
    gpa: Optional[float] = None
    year: Optional[int] = None
    strengths: List[str] = [] 
    language: Dict[str,str] = {}
    achievements: List[str] = []
    mentor: Optional[bool] = None

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)

class PersonalProfile(BaseModel):
    hobbies: List[str] = []
    personality: List[str] = []
    unique_brand: Optional[str] = None
    study_style: Optional[str] = None
    exciting_topics: List[str] = []
    goals: Dict[str,List[str]] = {}

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)

   
    

class StudentCase(BaseModel):
    potential: PotentialAnalysis
    personal: PersonalProfile

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)

class improving(BaseModel):
    advice: str
    article:str
    books: str
    newspaper: str
    certificatin_course:str
    
    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)



class RubricScore(BaseModel):
    professional_knowledge: int # 20 - Kiến thức chuyên môn
    practical_skills: int # 20 - Kỹ năng thực hành
    experience_achievements: int # 20 - Kinh nghiệm & thành tựu
    personal_branding: int # 15 - Định vị cá nhân
    goals_vision: int # 15 - Mục tiêu & tầm nhìn
    growth_potential: int # 10 - Tiềm năng phát triển

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)
    
    def _overall(self) -> Dict[float,str]:
        score = (
                self.professional_knowledge + 
                self.practical_skills + 
                self.experience_achievements + 
                self.personal_branding + 
                self.goals_vision + 
                self.growth_potential
                )/100
        kind = ""
        
        if score <= 50:
            kind = "weak"
        elif 50 < score <= 70:
            kind = "ok"
        else:
            kind = "strong"

        return {score:kind}
  

class Conclusion(BaseModel):
    personalityResult: str
    potentialResult: str
    source_advice: improving
    rubricResult: RubricScore
    web: Dict[str,str] = {}


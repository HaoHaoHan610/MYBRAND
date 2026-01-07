
from typing import List, Dict, Any, Optional
from google.genai.types import ProactivityConfig
from langchain_core import messages
from pydantic import BaseModel
from openai import OpenAI
import os

from pydantic_core.core_schema import bool_schema, list_schema # Define field as annotated attributes

class PotentialAnalysis(BaseModel):
    major: str
    gpa: float
    year: int
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
    aricle:str
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
    academic: int # 10
    skills: int # 20
    proof: int # 25
    positioning: int # 20
    goals: int # 15
    coherence: int # 5
    execution: int # 5

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)
    
    def _overall(self) -> Dict[float,str]:
        score = (
                self.academic + 
                self.skills + 
                self.proof + 
                self.positioning + 
                self.goals + 
                self.coherence +
                self.execution
                )/100
        kind = ""
        
        if score <= 50:
            kind = "weak"
        elif 50 < score <= 70:
            kind = "ok"
        else:
            kind = "strong"

        return {score:kind}
    


from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from pydantic_core.core_schema import bool_schema # Define field as annotated attributes

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

class Goals(BaseModel):
    short_term: List[str] = []
    mid_term: List[str] = []
    long_term: List[str] = []

    def __call__(self) -> Dict[str, Any]:
        return self.model_dump()

    def __iter__(self):
        yield from self.model_dump().items()

    def __str__(self) -> str:
        return self.model_dump_json(indent=2)


class PersonalProfile(BaseModel):
    hoppies: List[str] = []
    personality: Optional[str] = None
    unique_brand: Optional[str] = None
    study_style: Optional[str] = None
    exciting_topics = List[str] = []
    goals: Optional[Goals] = None

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


    

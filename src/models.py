
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

class SearchState(BaseModel):
    query: str
    extracted_advices: List[str] = []
    
    



    

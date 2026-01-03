
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from pydantic_core.core_schema import bool_schema # Define field as annotated attributes

class Potential(BaseModel):
    major: str
    gpa: int
    year: int
    strengths: List[str] = [] 
    language: Optional[int] = None
    achievements: List[str] = []
    mentor: Optional[bool] = None





    

from agent.workflows import WorkFlow
from agent.models import Conclusion,StudentCase
from typing import Optional,List,Dict, Any
from .loadFile import load_personality,load_potential
def  _return_result(UserID: Optional[str] = None):
    run = WorkFlow()
    try:
        file_potential = load_potential()
        potential = run._analyze_potential(file_potential)

        file_personality = load_personality()
        personlity = run._analyze_personality(file_personality)

        total = run._analyze_case(StudentCase(potential = potential,personal=personlity))
        
        rate = run._rate_profile(personality=personlity,academic=potential)
    except Exception as e:
        return {}
    return Conclusion(
            potentialResult = potential,
            personalityResult = personlity,
            totalResult= 
            


            )

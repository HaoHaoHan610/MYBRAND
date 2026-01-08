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

        total = run._analyze_case(StudentCase(potential = file_potential,personal=file_personality))
        
        rate = run._rate_profile(personality=file_personality,academic=file_potential)
    except Exception as e:
        print(e)
        return {}
    return {"result":Conclusion(
            potentialResult = potential["result"],
            personalityResult = personlity["result"],
            source_advice=total,
            rubricResult=rate,
            )
            }

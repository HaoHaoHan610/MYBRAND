from typing import Dict, Any, List, Optional
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from .models import PotentialAnalysis, PersonalProfile, StudentCase, RubricScore, improving
from dotenv import load_dotenv
from .prompts import ImprovingBackground
import os
from .engine import gogoduck_trafilatura_openai

class WorkFlow:
    def __init__(self):
        load_dotenv()
        # Scrape model
        # Analyzing models
        self.llm1 = ChatOpenAI(model= "gpt-4o-mini",temperature=0.1)
        self.llm2 = GoogleGenerativeAI(model = "gemini-2.5-flash",temperature = 0.3,api_key = os.getenv("GEMINI_API_KEY"))
        self.llm3 = GoogleGenerativeAI(model = "gemini-2.5-flash",temperature =0.3,api_key = os.getenv("GOOGLE_API_KEY2")) 
        self.prompts = ImprovingBackground()

    def _analyze_potential(self,state:PotentialAnalysis):
        print(f"Analyzing your background....")
        # structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(self.prompts.BackgroundAnalysis(state))
                ]

        try:
            result = self.llm3.invoke(messages)
            return {"result":result}
        except Exception as e:
            print(e)
            return {"result":"Failed to generate"}

    def _analyze_personality(self,state:PersonalProfile)-> Dict[str,Any]:
        print(f"Analyzing your personality....")
        # structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.PersonalityBranding(state))
                ]

        try:
            result = self.llm3.invoke(messages)
            return {"result": result}
        except Exception as e:
            print(e)
            return {"result":"Failed to generate"}
        
    def _analyze_case(self,state:StudentCase)->improving:
        print(f"Analyzing your Case....")
        structure_llm = self.llm1.with_structured_output(improving)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.case(state))
                ]

        try:
            result = structure_llm.invoke(messages)
            return result
        except Exception as e:
            print(e)
            return improving(
            advice="",
            newspaper = "",
            books="",
            certificatin_course="",
            article = ""
            )
    
    def _rate_profile(self,academic: PotentialAnalysis, personality: PersonalProfile) -> RubricScore:
        structured_llm = self.llm1.with_structured_output(RubricScore)
            
        message = [
                SystemMessage(self.prompts.CALCULATOR_SYSTEM),
                HumanMessage(self.prompts.Score(academic=academic,personality=personality))
                ]
        structured_llm = self.llm1.with_structured_output(RubricScore)
        try:
            
            message = [
                    SystemMessage(self.prompts.CALCULATOR_SYSTEM),
                    HumanMessage(self.prompts.Score(academic=academic,personality=personality))
                    ]
            result = structured_llm.invoke(message)
            return result
        except Exception as e:
            print(e)
            return RubricScore(
                    academic=0,
                    goals = 0,
                    skills=0,
                    proof=0,
                    positioning=0,
                    coherence=0,
                    execution=0
                )
    def _search_information(self,advide:improving):
        gogoduck_trafilatura_openai(query=advide.newspaper)

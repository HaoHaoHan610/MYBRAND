from typing import Dict, Any, List, Optional
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from .models import PotentialAnalysis, PersonalProfile, StudentCase, RubricScore
from .firecrawl import FirecrawlService
from dotenv import load_dotenv
from .prompts import ImprovingBackground
import os


class WorkFlow:
    def __init__(self):
        # Scrape model
        self.firecrawl = FirecrawlService()
        # Analyzing models
        self.llm1 = ChatOpenAI(model= "gpt-4o-mini",temperature=0.1)

        hg_llm = HuggingFaceEndpoint(
                repo_id="microsoft/Phi-3-mini-4k-instruct",
                task= "text-generation",
                provider= "auto",
                temperature=0.2,
                max_new_tokens=512
                )

        self.llm2 = ChatHuggingFace(llm = hg_llm)
        self.llm3 = GoogleGenerativeAI(model = "gemini-2.0-flask",temperature = 0.3)
        self.prompts = ImprovingBackground()

    def _analyze_potential(self,state:PotentialAnalysis):
        print(f"Analyzing your background....")
        # structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.BackgroundAnalysis(state))
                ]

        try:
            result = self.llm2.invoke(messages)
            return result.content
        except Exception as e:
            print(e)
            return {"Failed to generate"}

    def _analyze_personality(self,state:PersonalProfile)-> Dict[str,Any]:
        print(f"Analyzing your personality....")
        # structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.PersonalityBranding(state))
                ]

        try:
            result = self.llm2.invoke(messages)
            return {"result": result.content}
        except Exception as e:
            print(e)
            return {"result":"Failed to generate"}
        
    def _analyze_case(self,state:StudentCase)-> Dict[str,Any]:
        print(f"Analyzing your Case....")
        # structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.case(state))
                ]

        try:
            result = self.llm1.invoke(messages)
            return {"result": result.content}
        except Exception as e:
            print(e)
            return {"result":"Failed to generate"}
    
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
        



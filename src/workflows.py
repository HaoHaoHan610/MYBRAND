from typing import Dict, Any, List, Optional
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from .models import PotentialAnalysis
from .firecrawl import FirecrawlService
from dotenv import load_dotenv
from .prompts import ImprovingBackground


class WorkFlow:
    def __init__(self):
        self.firecrawl = FirecrawlService()
        self.llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.3)
        self.prompts = ImprovingBackground()

    def _analyze_potential(self,state:PotentialAnalysis):
        load_dotenv()
        print(f"Analyzing your background....")
        structure_llm = self.llm.with_structured_output(PotentialAnalysis)

        messages = [
                SystemMessage(content=self.prompts.HE_THONG_THUONG_HIEU_CA_NHAN),
                HumanMessage(content = self.prompts.nguoi_dung_thuong_hieu_ca_nhan(state))
                ]

        try:
            result = self.llm.invoke(messages)
            return result.content
        except Exception as e:
            print(e)
            return {"Failed to generate"}






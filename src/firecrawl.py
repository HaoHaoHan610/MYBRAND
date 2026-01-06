from firecrawl import Firecrawl
import os 
from firecrawl.types import ScrapeOptions
from dotenv import load_dotenv

load_dotenv()


class FirecrawlService:
    def __init__(self):
        api_key = os.getenv('FIRECRAWL_API_KEY')
        if not api_key:
            raise ValueError("Missing FIRECRAWL_API_KEY enviroment variable")
        self.app = Firecrawl(api_key=api_key)

    def search_query(self,query:str,num_results = 5):
        try:
            
            result = self.app.search(
                    query=query,
                    limit=num_results,
                    scrape_options=ScrapeOptions(formats = ["markdown"])
                    )
            return result
        except Exception as e:
            print(e)
            return []
    def search_url(self,url:str):
        try:
            result = self.app.scrape(
                    url = url,
                    formats = ["markdown"]
                    )
            return result
        except Exception as e:
            print(e)
            return []

    # def embedding(self,)

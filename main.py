from src.models import PotentialAnalysis
from src.workflows import WorkFlow

run = WorkFlow()
pa = PotentialAnalysis(
    major="IT", gpa=3.68, year=2,
    strengths=["Python", "SQL","DSA"],
    language={"English": "B2"},
    achievements=["Built a small web app"],
    mentor=True
)
print(run._analyze_advise(pa))

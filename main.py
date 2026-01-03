from src.models import PotentialAnalysis
from src.workflows import WorkFlow

run = WorkFlow()
pa = PotentialAnalysis(
    major="IT", gpa=3.2, year=2,
    strengths=["Python", "SQL"],
    language={"English": "B2"},
    achievements=["Built a small web app"],
    mentor=None
)
print(run._analyze_advise(pa))

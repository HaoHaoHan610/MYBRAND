from src.models import  PotentialAnalysis, PersonalProfile, StudentCase
from src.workflows import WorkFlow

run = WorkFlow()
pa = PotentialAnalysis(
    major="Logistic", gpa=3.68, year=2,
    strengths=["Tin học văn phòng", "Có chứng chỉ bên google cấp"],
    language={"English": "IELTS 8.0"},
    achievements=["have 2-month internship"],
    mentor=True
)

pp = PersonalProfile(
    hobbies=["basketball", "nuôi động vật", "chơi game"],
    personality=["tò mò", "thích làm nhanh", "cầu toàn trên những con số"],
    unique_brand="Kĩ năng giao tiếp tốt",
    study_style="Có tính tự học tìm hiểu cái mới",
    exciting_topics=["Quản lý chuổi cung ứng"],
    goals={"short_term":["đậu internship"], "mid_term":["Học thêm các chứng chỉ quản lý"], "long_term":["Làm quản lý chuổi cung ứng"]}
)
# print(run._analyze_potential(pa))
# print(run._analyze_personality(pp))
# print(run._analyze_case(StudentCase(potential=pa,personal=pp))["result"])
#
# print(run._rate_profile(pa,pp))

print(run._search_information(pa,pp))




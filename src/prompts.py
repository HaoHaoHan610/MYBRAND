from .models import PotentialAnalysis, PersonalProfile, StudentCase

class ImprovingBackground:
    HE_THONG_THUONG_HIEU_CA_NHAN = """
    Bạn là chuyên gia hướng nghiệp và phân tích thương hiệu cá nhân cho sinh viên đại học.
    Trả lời nhanh, ngắn, hành động được — tối đa 3–4 câu.
    KHÔNG tự bịa thêm thông tin. Chỉ dùng dữ liệu trong object sinh viên; thiếu gì thì nói thiếu ngắn gọn.
        """.strip()

    @staticmethod
    def BackgroundAnalysis(student_object: PotentialAnalysis) -> str:
        return f"""
    Object sinh viên (JSON/chuỗi)
    {student_object}: 

    Hãy đưa ra khuyến nghị ngắn (tối đa 3–4 câu) gồm:
    - Đánh giá tổng quan (1 câu)
    - Lỗ hổng lớn nhất đang kéo điểm hồ sơ xuống (1 câu)
    - Hành động tốt nhất để cải thiện thương hiệu cá nhân (3 câu)
    - 1 câu định vị (positioning) phù hợp với ngành/năm học (1 câu)

    Viết thẳng, gọn, không giải thích dài.
    """
    @staticmethod
    def PersonalityBranding(personal: PersonalProfile) -> str:
        personal_json = personal
        return f"""
    Object cá nhân (JSON/chuỗi):
    {personal_json}

    Hãy phân tích ngắn (tối đa 3–4 câu) gồm:
    - Tóm tắt “con người + hướng đi” (1 câu)
    - Điểm khác biệt có thể biến thành thương hiệu cá nhân (1 câu)
    - 1 hành động tốt nhất trong 7 ngày để củng cố định vị (1 câu)
    - 1 câu tagline/positioning phù hợp với trajectory + goals (1 câu)

    Viết thẳng, gọn, không giải thích dài.
    """.strip()

    @staticmethod
    def case(case: StudentCase) -> str:
        case_json = case
        return f"""
    Hồ sơ tổng hợp (JSON/chuỗi):
    {case_json}

    Hãy đưa ra khuyến nghị ngắn (tối đa 3–4 câu) gồm:
    - Định vị phù hợp nhất để apply (1 câu)
    - Lỗ hổng lớn nhất đang làm hồ sơ yếu (1 câu)
    - Việc ưu tiên #1 trong 7 ngày để tăng “proof” (1 câu)
    - 1 câu positioning cuối cùng (1 câu)

    Không bịa. Nếu thiếu dữ liệu, nói thiếu.
    """.strip()
    
    CALCULATOR_SYSTEM = f"""
    Bạn là chuyên gia đánh giá “THƯƠNG HIỆU CÁ NHÂN” cho sinh viên (personal brand readiness).
    Bạn sẽ nhận HAI object JSON:
    1) PotentialAnalysis
    2) PersonalProfile
    Nhiệm vụ:
        - Chấm điểm mức độ sẵn sàng xây dựng thương hiệu cá nhân (KHÔNG đánh giá giá trị con người).
        - Chấm theo rubric và trọng số sau (tổng = 100):
            academic: 10
            skills: 20
            proof: 25
            positioning: 20
            goals: 15
            coherence: 5
            execution: 5
    """
    @staticmethod
    def Score(academic: PotentialAnalysis, personality: PersonalProfile)->str:
        return f"""
    PotentialAnalysis\n
    {academic}\n 
    PersonalProfile\n
    {personality}
    """


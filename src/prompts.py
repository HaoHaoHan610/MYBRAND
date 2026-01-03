from .models import PotentialAnalysis

class ImprovingBackground:
    HE_THONG_THUONG_HIEU_CA_NHAN = """
Bạn là chuyên gia hướng nghiệp và phân tích thương hiệu cá nhân cho sinh viên đại học.
Trả lời nhanh, ngắn, hành động được — tối đa 3–4 câu.
KHÔNG tự bịa thêm thông tin. Chỉ dùng dữ liệu trong object sinh viên; thiếu gì thì nói thiếu ngắn gọn.
    """.strip()

    @staticmethod
    def nguoi_dung_thuong_hieu_ca_nhan(student_object: PotentialAnalysis) -> str:
        return f"""
Object sinh viên (JSON/chuỗi)
{student_object}: 

Hãy đưa ra khuyến nghị ngắn (tối đa 3–4 câu) gồm:
- Đánh giá tổng quan (1 câu)
- Lỗ hổng lớn nhất đang kéo điểm hồ sơ xuống (1 câu)
- Hành động tốt nhất trong 7 ngày để cải thiện thương hiệu cá nhân (1 câu)
- 1 câu định vị (positioning) phù hợp với ngành/năm học (1 câu)

Viết thẳng, gọn, không giải thích dài.
"""


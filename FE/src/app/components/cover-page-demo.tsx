import { CoverPage } from "./cover-page";

/**
 * Demo page showing the cover page component
 * You can customize the data below with your actual information
 */
export function CoverPageDemo() {
  return (
    <CoverPage
      title="HỆ THỐNG PHÂN TÍCH TIỀM NĂNG VÀ ĐỊNH VỊ THƯƠNG HIỆU CÁ NHÂN"
      subject="Design Thinking"
      className="Lớp 01"
      instructor="PGS. TS. VÕ CÔNG PHƯƠNG"
      groupNumber={4}
      members={[
        {
          name: "Lê Thiên Hạo",
          studentId: "0889807708",
          role: "Nhóm trưởng",
        },
        {
          name: "Nguyễn Chí Bình",
          studentId: "056206000081",
          role: "Thành viên",
        },
        {
          name: "Đậu Thị Hoài Thương",
          studentId: "056306004065",
          role: "Thành viên",
        },
        {
          name: "Nguyễn Văn Thành Đạt",
          studentId: "038206014471",
          role: "Thành viên",
        },        
        {
          name: "Nguyễn Anh Khoa",
          studentId: "075206022205",
          role: "Thành viên",
        },
        {
          name: "Đào An Xuyên",
          studentId: "052306008226",
          role: "Thành viên",
        },


      ]}
      groupPhotos={[
        // Add your group photo URLs here, or leave empty for placeholder
        // Example: "/images/group-photo-1.jpg",
        // "/images/group-photo-2.jpg",
      ]}
      school="Trường Đại học Giao thông Vận Tải TP.HCM"
      submissionDate="08 tháng 1, 2026"
    />
  );
}




import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "motion/react";
import { Sparkles, Users, GraduationCap, Calendar } from "lucide-react";

interface GroupMember {
  name: string;
  studentId: string;
  role: string;
  email?: string;
}

interface CoverPageProps {
  title: string;
  subject: string;
  className: string;
  instructor: string;
  groupNumber: number;
  members: GroupMember[];
  groupPhotos?: string[]; // URLs or paths to group photos
  backgroundImage?: string; // Background image for entire page
  school?: string;
  department?: string;
  submissionDate?: string;
}

export function CoverPage({
  title,
  subject,
  className,
  instructor,
  groupNumber,
  members,
  groupPhotos = [],
  backgroundImage,
  school = "Trường Đại Học",
  department = "Khoa Công Nghệ Thông Tin",
  submissionDate,
}: CoverPageProps) {
  const currentDate = submissionDate || new Date().toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dark min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      {/* Background Image với overlay mờ */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          {/* Overlay mờ để text vẫn đọc được nhưng vẫn thấy hình nhóm */}
          <div className="absolute inset-0 bg-[#0a0a0a]/75 backdrop-blur-[1px]" />
          {/* Gradient overlay để tạo depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/70 to-[#0a0a0a]/80" />
        </div>
      )}

      {/* Background decorative elements - same as main app */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-muted-foreground">
            <span className="font-semibold text-emerald-400">{subject}</span>
            <span className="text-white/30">|</span>
            <span>{className}</span>
            <span className="text-white/30">|</span>
            <span className="italic">GV: {instructor}</span>
          </div>
        </motion.div>

        {/* Main Content - 2 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Left Column - Group Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-[#111111] border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-xl">Nhóm {groupNumber}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Members Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#1a1a1a] border-b border-white/10">
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          Họ tên
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          MSSV
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          Vai trò
                        </th>
                        {members.some((m) => m.email) && (
                          <th className="px-4 py-3 text-left font-semibold text-foreground">
                            Email
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/5 hover:bg-[#1a1a1a]/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-foreground">
                            {member.name}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            {member.studentId}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {member.role}
                          </td>
                          {members.some((m) => m.email) && (
                            <td className="px-4 py-3 text-muted-foreground text-xs">
                              {member.email || "-"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Group Photos */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-[#111111] border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-xl">Ảnh nhóm</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {groupPhotos.length > 0 ? (
                  <div
                    className={`grid gap-4 ${
                      groupPhotos.length === 1
                        ? "grid-cols-1"
                        : groupPhotos.length <= 4
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
                  >
                    {groupPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg border-2 border-white/10"
                      >
                        <img
                          src={photo}
                          alt={`Group photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-dashed border-white/20 bg-[#1a1a1a] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <svg
                        className="w-16 h-16 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Group Photo</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold text-foreground">{school}</span>
              {department && (
                <>
                  <span className="text-white/30">–</span>
                  <span>{department}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-foreground">Ngày nộp:</span>
              <span>{currentDate}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Example usage component
export function CoverPageExample() {
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


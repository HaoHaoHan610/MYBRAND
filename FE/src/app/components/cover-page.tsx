import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "motion/react";
import { Sparkles, Users, GraduationCap, Calendar, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

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
  onNavigateToMain?: () => void; // Callback to navigate to main page
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
  onNavigateToMain,
}: CoverPageProps) {
  const currentDate = submissionDate || new Date().toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dark min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      {/* Navigation Button - Top Right */}
      {onNavigateToMain && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={onNavigateToMain}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>Đến trang phân tích</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}

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

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <motion.div 
            className="mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-emerald-400">{subject}</span>
              <span className="text-white/30">|</span>
              <span>{className}</span>
              <span className="text-white/30">|</span>
              <span className="italic">GV: {instructor}</span>
            </div>
          </motion.div>
        </div>

        {/* Main Content - Group Photo Full Width with Overlay Members */}
        <div className="relative mb-4 sm:mb-6 w-full">
          {/* Group Photo - Full Width Background */}
          <motion.div 
            className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden z-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {groupPhotos.length > 0 ? (
              <>
                <img
                  src={groupPhotos[0]}
                  alt="Group Photo"
                  className="w-full h-full object-cover object-center brightness-[0.4] contrast-75"
                  style={{ objectPosition: 'center 30%' }}
                />
                {/* Dark overlay để làm ảnh tối và mờ, phù hợp với background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-[#0a0a0a]/40" />
              </>
            ) : (
              <div className="relative w-full h-full bg-[#1a1a1a] flex items-center justify-center border-y border-dashed border-white/20">
                <div className="text-center text-muted-foreground">
                  <GraduationCap className="w-16 h-16 mx-auto mb-3 text-white/30" />
                  <p className="text-base sm:text-lg font-medium text-white/50">Ảnh nhóm</p>
                  <p className="text-xs sm:text-sm text-white/30 mt-1">Group Photo</p>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Member Cards - Overlaying on Group Photo */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none py-4">
            <motion.div 
              className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-5">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer flex-[0_0_auto] w-[calc(50%-4px)] sm:w-[calc(33.333%-8px)] lg:w-[260px] xl:w-[280px]"
                  >
                    <Card className="bg-[#111111]/95 backdrop-blur-md border-white/20 hover:border-emerald-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 h-full">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Avatar/Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-2 border-emerald-400/30 flex items-center justify-center">
                              <Users className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
                            </div>
                          </div>
                          {/* Member Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 break-words group-hover:text-emerald-400 transition-colors leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-xs text-muted-foreground font-mono mb-2 break-all">
                              {member.studentId}
                            </p>
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20">
                              <span className="text-xs font-medium text-emerald-400">
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
          <motion.div 
            className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-muted-foreground">
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
            {onNavigateToMain && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  onClick={onNavigateToMain}
                  variant="outline"
                  className="border-emerald-400/30 hover:border-emerald-400 hover:bg-emerald-400/10 text-emerald-400 group"
                >
                  <span>Bắt đầu phân tích</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
        </div>
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


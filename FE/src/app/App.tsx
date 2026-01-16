import React, { useState } from "react";
import { ProfileForm } from "./components/profile-form";
import { ResultsPanel } from "./components/results-panel";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { CoverPage } from "./components/cover-page";
import { Button } from "./components/ui/button";

export interface PersonalProfile {
  hobbies: string[];
  personality: string[];
  unique_brand: string;
  study_style: string;
  exciting_topics: string[];
  goals: {
    short_term: string[];
    long_term: string[];
  };
}

export interface PotentialAnalysis {
  major: string;
  gpa: number;
  year: number;
  strengths: string[];
  language: Record<string, string>;
  achievements: string[];
  mentor: boolean;
}

export interface AnalysisResult {
  personalityResult: string;
  potentialResult: string;
  source_advice: {
    advice: string;
    article: string;
    books: string;
    newspaper: string;
    certificatin_course: string;
  };
  rubricResult: {
    professional_knowledge: number;
    practical_skills: number;
    experience_achievements: number;
    personal_branding: number;
    goals_vision: number;
    growth_potential: number;
  };
  web: Record<string, string>; // Dict {title: url}
}

export default function App() {
  const [showCoverPage, setShowCoverPage] = useState(true);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (
    personalProfile: PersonalProfile,
    potentialAnalysis: PotentialAnalysis
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      // Bước 1: Gửi dữ liệu phân tích tiềm năng
      const potentialResponse = await fetch(`${API_BASE_URL}/input/potential`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          major: potentialAnalysis.major,
          gpa: potentialAnalysis.gpa,
          year: potentialAnalysis.year,
          strengths: potentialAnalysis.strengths,
          language: potentialAnalysis.language,
          achievements: potentialAnalysis.achievements,
          mentor: potentialAnalysis.mentor,
        }),
      });

      if (!potentialResponse.ok) {
        let errorMessage = 'Không thể gửi dữ liệu phân tích tiềm năng';
        try {
          const errorData = await potentialResponse.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${potentialResponse.status}: ${potentialResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Bước 2: Gửi dữ liệu hồ sơ cá nhân
      const personalityResponse = await fetch(`${API_BASE_URL}/input/personality`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hobbies: personalProfile.hobbies,
          personality: personalProfile.personality,
          unique_brand: personalProfile.unique_brand,
          study_style: personalProfile.study_style,
          exciting_topics: personalProfile.exciting_topics,
          goals: personalProfile.goals,
        }),
      });

      if (!personalityResponse.ok) {
        let errorMessage = 'Không thể gửi hồ sơ cá nhân';
        try {
          const errorData = await personalityResponse.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${personalityResponse.status}: ${personalityResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Bước 3: Lấy kết quả phân tích
      const resultsResponse = await fetch(`${API_BASE_URL}/AnalyzedData/Advices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!resultsResponse.ok) {
        let errorMessage = 'Không thể lấy kết quả phân tích';
        try {
          const errorData = await resultsResponse.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${resultsResponse.status}: ${resultsResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }

      let resultData: AnalysisResult;
      try {
        resultData = await resultsResponse.json();
        console.log('Đã nhận dữ liệu kết quả:', resultData);
      } catch (parseError) {
        console.error('Không thể parse JSON response:', parseError);
        const textResponse = await resultsResponse.text();
        console.error('Nội dung response:', textResponse);
        throw new Error('Phản hồi JSON không hợp lệ từ server');
      }
      
      // Kiểm tra các trường bắt buộc
      if (!resultData.personalityResult || !resultData.potentialResult) {
        console.error('Thiếu các trường bắt buộc trong response:', resultData);
        throw new Error('Định dạng response không hợp lệ: thiếu các trường bắt buộc');
      }
      
      // Đảm bảo web là object (có thể null/undefined từ backend)
      if (!resultData.web) {
        resultData.web = {};
      }
      
      setResults(resultData);
      
      // Cuộn đến kết quả trên mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          const resultsSection = document.querySelector('[data-results-panel]');
          resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (err) {
      let errorMessage = "Phân tích hồ sơ thất bại. Vui lòng thử lại.";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.";
      }
      
      setError(errorMessage);
      console.error('Analysis error:', err);
      
      // Log more details for debugging
      if (err instanceof TypeError) {
        console.error('Network error details:', {
          message: err.message,
          stack: err.stack,
          API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  // Show cover page first
  if (showCoverPage) {
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
          studentId: "089206010393",
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
        {
          name: "Nguyễn Đắc Lợi",
          studentId: "052306008226",
          role: "Thành viên",
        },


      ]}
      groupPhotos={[
        "/truong-dai-hoc-giao-thong-van-tai-tphcm.jpg"
      ]}
      school="Trường Đại học Giao thông Vận Tải TP.HCM"
      submissionDate="08 tháng 1, 2026"
      onNavigateToMain={() => setShowCoverPage(false)}
    />
  );

  }

  return (
    <div className="dark min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      {/* Nút quay lại trang bìa */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setShowCoverPage(true)}
          variant="outline"
          size="sm"
          className="bg-[#0a0a0a]/80 backdrop-blur border-white/10"
        >
          Trang bìa
        </Button>
      </div>
      <Toaster />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>
      
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl tracking-tight">Bảng Điều Khiển Phân Tích</h1>
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={results ? "complete" : "ready"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge 
                    variant="outline" 
                    className={`${
                      results
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                    } px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm`}
                  >
                    {results ? "Hoàn thành phân tích" : "Sẵn sàng phân tích"}
                  </Badge>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.p 
              className="text-sm sm:text-base text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Phân tích tiềm năng và định vị thương hiệu cá nhân
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Panel trái - Form nhập liệu */}
          <motion.div 
            className="order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProfileForm
              onAnalyze={handleAnalyze}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Panel phải - Kết quả */}
          <motion.div 
            className="order-2"
            data-results-panel
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ResultsPanel
              results={results}
              isLoading={isLoading}
              error={error}
              onRetry={handleReset}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

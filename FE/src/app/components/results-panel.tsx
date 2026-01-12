import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import {
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  TrendingUp,
  BookOpen,
  Award,
  Link as LinkIcon,
  Target,
  Lightbulb,
  GraduationCap,
  Users,
  Zap,
} from "lucide-react";
import { AnalysisResult } from "../App";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ResultsPanelProps {
  results: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function ResultsPanel({ results, isLoading, error, onRetry }: ResultsPanelProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  // Animate rubric scores
  useEffect(() => {
    if (results?.rubricResult) {
      const scores = results.rubricResult;
      const timers: NodeJS.Timeout[] = [];
      
      Object.entries(scores).forEach(([key, value]) => {
        let current = 0;
        const increment = value / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(timer);
          }
          setAnimatedValues((prev) => ({ ...prev, [key]: Math.round(current) }));
        }, 20);
        timers.push(timer);
      });
      
      return () => {
        timers.forEach(timer => clearInterval(timer));
      };
    }
  }, [results]);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success(`${section} copied to clipboard`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyAllResults = () => {
    if (results) {
      const jsonString = JSON.stringify(results, null, 2);
      navigator.clipboard.writeText(jsonString);
      toast.success("Đã sao chép toàn bộ kết quả");
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10 mt-2" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-3/4 bg-white/10" />
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/10" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert className="bg-destructive/10 border-destructive/30">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <AlertTitle>Phân tích thất bại</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p>{error}</p>
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="border-destructive/30 bg-destructive/10 hover:bg-destructive/20"
          >
            Thử lại
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!results) {
    return (
      <Card className="bg-[#111111] border-white/10 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
          </motion.div>
          <motion.h3
            className="text-lg sm:text-xl mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Chưa có kết quả
          </motion.h3>
          <motion.p
            className="text-sm sm:text-base text-muted-foreground text-center max-w-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Điền thông tin hồ sơ ở bên trái và nhấn "Phân tích hồ sơ" để xem
            phân tích và gợi ý cá nhân hóa của bạn.
          </motion.p>
        </CardContent>
      </Card>
    );
  }

  // Highlight key phrases in text
  const highlightText = (text: string) => {
    const parts = text.split("\n\n");
    return parts.map((paragraph, idx) => (
      <motion.p
        key={idx}
        className="text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        {paragraph}
      </motion.p>
    ));
  };

  // Max scores for each metric (from backend schema comments)
  const maxScores = {
    academic: 10,
    skills: 20,
    proof: 25,
    positioning: 20,
    goals: 15,
    coherence: 5,
    execution: 5,
  };

  const rubricMetrics = [
    { 
      key: "academic",
      name: "Học thuật", 
      value: results.rubricResult.academic, 
      max: maxScores.academic,
      percentage: (results.rubricResult.academic / maxScores.academic) * 100,
      color: "bg-blue-500" 
    },
    { 
      key: "skills",
      name: "Kỹ năng", 
      value: results.rubricResult.skills, 
      max: maxScores.skills,
      percentage: (results.rubricResult.skills / maxScores.skills) * 100,
      color: "bg-emerald-500" 
    },
    { 
      key: "proof",
      name: "Bằng chứng", 
      value: results.rubricResult.proof, 
      max: maxScores.proof,
      percentage: (results.rubricResult.proof / maxScores.proof) * 100,
      color: "bg-purple-500" 
    },
    { 
      key: "positioning",
      name: "Định vị", 
      value: results.rubricResult.positioning, 
      max: maxScores.positioning,
      percentage: (results.rubricResult.positioning / maxScores.positioning) * 100,
      color: "bg-amber-500" 
    },
    { 
      key: "goals",
      name: "Mục tiêu", 
      value: results.rubricResult.goals, 
      max: maxScores.goals,
      percentage: (results.rubricResult.goals / maxScores.goals) * 100,
      color: "bg-pink-500" 
    },
    { 
      key: "coherence",
      name: "Tính mạch lạc", 
      value: results.rubricResult.coherence, 
      max: maxScores.coherence,
      percentage: (results.rubricResult.coherence / maxScores.coherence) * 100,
      color: "bg-cyan-500" 
    },
    { 
      key: "execution",
      name: "Thực thi", 
      value: results.rubricResult.execution, 
      max: maxScores.execution,
      percentage: (results.rubricResult.execution / maxScores.execution) * 100,
      color: "bg-orange-500" 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Copy All Button */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={copyAllResults}
          variant="outline"
          size="sm"
          className="border-white/10 bg-[#1a1a1a]"
        >
          <Copy className="h-4 w-4 mr-2" />
          Sao chép JSON đầy đủ
        </Button>
      </motion.div>

      {/* Personality Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-xl">Phân tích tính cách</CardTitle>
                </div>
                <CardDescription>Dựa trên hồ sơ và đặc điểm của bạn</CardDescription>
              </div>
              <Button
                onClick={() => copyToClipboard(results.personalityResult, "Phân tích tính cách")}
                variant="ghost"
                size="icon"
                className="hover:bg-white/5"
              >
                {copiedSection === "Phân tích tính cách" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {highlightText(results.personalityResult)}
          </CardContent>
        </Card>
      </motion.div>

      {/* Potential Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-xl">Đánh giá tiềm năng</CardTitle>
                </div>
                <CardDescription>Khả năng và con đường phát triển của bạn</CardDescription>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard(
                    results.potentialResult,
                    "Đánh giá tiềm năng"
                  )
                }
                variant="ghost"
                size="icon"
                className="hover:bg-white/5"
              >
                {copiedSection === "Đánh giá tiềm năng" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">{highlightText(results.potentialResult)}</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Source Advice with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-xl">Tài nguyên được tuyển chọn</CardTitle>
            </div>
            <CardDescription>Gợi ý cá nhân hóa theo danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="advice" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-[#1a1a1a]">
                <TabsTrigger value="advice">Lời khuyên</TabsTrigger>
                <TabsTrigger value="article">Bài viết</TabsTrigger>
                <TabsTrigger value="books">Sách</TabsTrigger>
                <TabsTrigger value="newspaper">Tin tức</TabsTrigger>
                <TabsTrigger value="certification">Khóa học</TabsTrigger>
              </TabsList>

              <TabsContent value="advice" className="space-y-2 mt-4">
                <motion.div
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.source_advice.advice}</p>
                </motion.div>
              </TabsContent>

              <TabsContent value="article" className="space-y-2 mt-4">
                <motion.div
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.source_advice.article}</p>
                </motion.div>
              </TabsContent>

              <TabsContent value="books" className="space-y-2 mt-4">
                <motion.div
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.source_advice.books}</p>
                </motion.div>
              </TabsContent>

              <TabsContent value="newspaper" className="space-y-2 mt-4">
                <motion.div
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.source_advice.newspaper}</p>
                </motion.div>
              </TabsContent>

              <TabsContent value="certification" className="space-y-2 mt-4">
                <motion.div
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.source_advice.certificatin_course}</p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rubric Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-xl">Đánh giá kỹ năng</CardTitle>
            </div>
            <CardDescription>Năng lực được đánh giá qua các lĩnh vực chính</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Radar Chart */}
            <div className="w-full h-[300px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={rubricMetrics.map(metric => ({
                    skill: metric.name,
                    value: metric.percentage,
                    fullMark: 100,
                  }))}
                >
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#71717a" }} />
                  <Radar
                    name="Điểm số"
                    dataKey="value"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number, name: string, props: any) => {
                      const metric = rubricMetrics.find(m => m.name === props.skill);
                      return [`${metric?.value}/${metric?.max} (${value.toFixed(1)}%)`, "Điểm"];
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Progress Bars */}
            {rubricMetrics.map((metric, idx) => {
              const animatedValue = animatedValues[metric.key] ?? 0;
              const animatedPercentage = (animatedValue / metric.max) * 100;
              
              return (
                <motion.div
                  key={metric.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{metric.name}</span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {Math.round(animatedValue)}/{metric.max} ({Math.round(animatedPercentage)}%)
                    </span>
                  </div>
                  <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute h-full ${metric.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${animatedPercentage}%` }}
                      transition={{ duration: 1, delay: 0.7 + idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Web Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-[#111111] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-xl">Tài nguyên được đề xuất</CardTitle>
            </div>
            <CardDescription>Bài viết được tuyển chọn và liên kết ngoài</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {Object.entries(results.web || {}).map(([title, url], idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                  >
                    <span className="text-sm group-hover:text-cyan-300 transition-colors">
                      {title}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
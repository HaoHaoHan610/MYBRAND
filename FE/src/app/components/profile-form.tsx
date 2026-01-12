import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, Plus, Loader2, AlertCircle, User, Target, GraduationCap } from "lucide-react";
import { PersonalProfile, PotentialAnalysis } from "../App";
import { toast } from "sonner";

interface ProfileFormProps {
  onAnalyze: (personal: PersonalProfile, potential: PotentialAnalysis) => void;
  onReset: () => void;
  isLoading: boolean;
}

export function ProfileForm({ onAnalyze, onReset, isLoading }: ProfileFormProps) {
  // Trạng thái Hồ sơ Cá nhân
  const [hobbies, setHobbies] = useState<string[]>(["Đọc sách", "Lập trình"]);
  const [hobbyInput, setHobbyInput] = useState("");
  
  const [personality, setPersonality] = useState<string[]>(["Phân tích", "Sáng tạo"]);
  const [personalityInput, setPersonalityInput] = useState("");
  
  const [uniqueBrand, setUniqueBrand] = useState("Giải quyết vấn đề với tư duy sáng tạo");
  const [studyStyle, setStudyStyle] = useState("hands-on");
  
  const [excitingTopics, setExcitingTopics] = useState<string[]>(["AI", "Phát triển Web"]);
  const [topicInput, setTopicInput] = useState("");
  
  const [shortTermGoals, setShortTermGoals] = useState<string[]>([
    "Hoàn thành thực tập",
    "Xây dựng portfolio",
  ]);
  const [longTermGoals, setLongTermGoals] = useState<string[]>([
    "Vị trí Senior Developer",
    "Vị trí Tech Lead",
  ]);
  const [shortGoalInput, setShortGoalInput] = useState("");
  const [longGoalInput, setLongGoalInput] = useState("");

  // Trạng thái Phân tích Tiềm năng
  const [major, setMajor] = useState("Khoa học Máy tính");
  const [gpa, setGpa] = useState("3.8");
  const [year, setYear] = useState("3");
  
  const [strengths, setStrengths] = useState<string[]>([
    "Giải quyết vấn đề",
    "Làm việc nhóm",
  ]);
  const [strengthInput, setStrengthInput] = useState("");
  
  const [languages, setLanguages] = useState<Array<{ key: string; value: string }>>([
    { key: "Tiếng Anh", value: "Bản ngữ" },
    { key: "Tiếng Tây Ban Nha", value: "Trung cấp" },
  ]);
  
  const [achievements, setAchievements] = useState<string[]>([
    "Danh sách Hiệu trưởng 2024",
    "Giải nhất Hackathon",
  ]);
  const [achievementInput, setAchievementInput] = useState("");
  
  const [mentor, setMentor] = useState(true);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Chip management functions
  const addChip = (value: string, setter: (arr: string[]) => void, current: string[]) => {
    if (value.trim() && !current.includes(value.trim())) {
      setter([...current, value.trim()]);
    }
  };

  const removeChip = (index: number, setter: (arr: string[]) => void, current: string[]) => {
    setter(current.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Xác thực
    const newErrors: Record<string, string> = {};

    if (!major.trim()) newErrors.major = "Chuyên ngành là bắt buộc";
    if (!gpa || parseFloat(gpa) < 0 || parseFloat(gpa) > 4) {
      newErrors.gpa = "GPA phải từ 0 đến 4";
    }
    if (!year || parseInt(year) < 1 || parseInt(year) > 6) {
      newErrors.year = "Năm học phải từ 1 đến 6";
    }
    if (!uniqueBrand.trim()) newErrors.uniqueBrand = "Thương hiệu cá nhân là bắt buộc";
    if (hobbies.length === 0) newErrors.hobbies = "Thêm ít nhất một sở thích";
    if (personality.length === 0) newErrors.personality = "Thêm ít nhất một đặc điểm tính cách";
    if (excitingTopics.length === 0) newErrors.excitingTopics = "Thêm ít nhất một chủ đề";
    if (strengths.length === 0) newErrors.strengths = "Thêm ít nhất một điểm mạnh";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    setErrors({});

    const personalProfile: PersonalProfile = {
      hobbies,
      personality,
      unique_brand: uniqueBrand,
      study_style: studyStyle,
      exciting_topics: excitingTopics,
      goals: {
        short_term: shortTermGoals,
        long_term: longTermGoals,
      },
    };

    const potentialAnalysis: PotentialAnalysis = {
      major,
      gpa: parseFloat(gpa) || 0,
      year: parseInt(year) || 1,
      strengths,
      language: Object.fromEntries(languages.map((l) => [l.key, l.value])),
      achievements,
      mentor,
    };

    onAnalyze(personalProfile, potentialAnalysis);
  };

  const addLanguage = () => {
    setLanguages([...languages, { key: "", value: "" }]);
  };

  const updateLanguage = (index: number, field: "key" | "value", value: string) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phần Hồ sơ Cá nhân */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-xl">Hồ sơ Cá nhân</CardTitle>
          </div>
          <CardDescription>Cho chúng tôi biết về bản thân và sở thích của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sở thích */}
          <div className="space-y-2">
            <Label htmlFor="hobbies">Sở thích</Label>
            <div className="flex gap-2">
              <Input
                id="hobbies"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip(hobbyInput, setHobbies, hobbies);
                    setHobbyInput("");
                  }
                }}
                placeholder="Nhập và nhấn Enter"
                className="bg-[#1a1a1a] border-white/10"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  addChip(hobbyInput, setHobbies, hobbies);
                  setHobbyInput("");
                }}
                className="border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {hobbies.map((hobby, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 pl-3 pr-1.5 py-1.5"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeChip(idx, setHobbies, hobbies)}
                    className="ml-2 hover:bg-emerald-500/30 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.hobbies && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.hobbies}
              </p>
            )}
          </div>

          {/* Tính cách */}
          <div className="space-y-2">
            <Label htmlFor="personality">Đặc điểm Tính cách</Label>
            <div className="flex gap-2">
              <Input
                id="personality"
                value={personalityInput}
                onChange={(e) => setPersonalityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip(personalityInput, setPersonality, personality);
                    setPersonalityInput("");
                  }
                }}
                placeholder="Nhập và nhấn Enter"
                className="bg-[#1a1a1a] border-white/10"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  addChip(personalityInput, setPersonality, personality);
                  setPersonalityInput("");
                }}
                className="border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {personality.map((trait, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 pl-3 pr-1.5 py-1.5"
                >
                  {trait}
                  <button
                    type="button"
                    onClick={() => removeChip(idx, setPersonality, personality)}
                    className="ml-2 hover:bg-blue-500/30 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.personality && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.personality}
              </p>
            )}
          </div>

          {/* Thương hiệu Cá nhân */}
          <div className="space-y-2">
            <Label htmlFor="uniqueBrand">Thương hiệu Cá nhân</Label>
            <Input
              id="uniqueBrand"
              value={uniqueBrand}
              onChange={(e) => setUniqueBrand(e.target.value)}
              placeholder="Điều gì làm bạn trở nên độc đáo?"
              className="bg-[#1a1a1a] border-white/10"
            />
            {errors.uniqueBrand && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.uniqueBrand}
              </p>
            )}
          </div>

          {/* Phong cách Học tập */}
          <div className="space-y-2">
            <Label htmlFor="studyStyle">Phong cách Học tập</Label>
            <Select value={studyStyle} onValueChange={setStudyStyle}>
              <SelectTrigger className="bg-[#1a1a1a] border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10">
                <SelectItem value="visual">Học qua hình ảnh</SelectItem>
                <SelectItem value="auditory">Học qua âm thanh</SelectItem>
                <SelectItem value="reading">Học qua đọc/viết</SelectItem>
                <SelectItem value="hands-on">Học qua thực hành</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chủ đề Thú vị */}
          <div className="space-y-2">
            <Label htmlFor="topics">Chủ đề Thú vị</Label>
            <div className="flex gap-2">
              <Input
                id="topics"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip(topicInput, setExcitingTopics, excitingTopics);
                    setTopicInput("");
                  }
                }}
                placeholder="Nhập và nhấn Enter"
                className="bg-[#1a1a1a] border-white/10"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  addChip(topicInput, setExcitingTopics, excitingTopics);
                  setTopicInput("");
                }}
                className="border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {excitingTopics.map((topic, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30 pl-3 pr-1.5 py-1.5"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeChip(idx, setExcitingTopics, excitingTopics)}
                    className="ml-2 hover:bg-purple-500/30 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.excitingTopics && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.excitingTopics}
              </p>
            )}
          </div>

          {/* Mục tiêu */}
          <div className="space-y-4">
            <Label>Mục tiêu</Label>
            
            {/* Mục tiêu Ngắn hạn */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Ngắn hạn</p>
              <div className="flex gap-2">
                <Input
                  value={shortGoalInput}
                  onChange={(e) => setShortGoalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addChip(shortGoalInput, setShortTermGoals, shortTermGoals);
                      setShortGoalInput("");
                    }
                  }}
                  placeholder="Thêm mục tiêu ngắn hạn"
                  className="bg-[#1a1a1a] border-white/10"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    addChip(shortGoalInput, setShortTermGoals, shortTermGoals);
                    setShortGoalInput("");
                  }}
                  className="border-white/10 bg-[#1a1a1a]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-1 mt-2">
                {shortTermGoals.map((goal, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm bg-[#1a1a1a] px-3 py-2 rounded-md"
                  >
                    <span className="flex-1">{goal}</span>
                    <button
                      type="button"
                      onClick={() => removeChip(idx, setShortTermGoals, shortTermGoals)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mục tiêu Dài hạn */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Dài hạn</p>
              <div className="flex gap-2">
                <Input
                  value={longGoalInput}
                  onChange={(e) => setLongGoalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addChip(longGoalInput, setLongTermGoals, longTermGoals);
                      setLongGoalInput("");
                    }
                  }}
                  placeholder="Thêm mục tiêu dài hạn"
                  className="bg-[#1a1a1a] border-white/10"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    addChip(longGoalInput, setLongTermGoals, longTermGoals);
                    setLongGoalInput("");
                  }}
                  className="border-white/10 bg-[#1a1a1a]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-1 mt-2">
                {longTermGoals.map((goal, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm bg-[#1a1a1a] px-3 py-2 rounded-md"
                  >
                    <span className="flex-1">{goal}</span>
                    <button
                      type="button"
                      onClick={() => removeChip(idx, setLongTermGoals, longTermGoals)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phần Phân tích Tiềm năng */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-xl">Phân tích Tiềm năng</CardTitle>
          </div>
          <CardDescription>Nền tảng học thuật và khả năng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chuyên ngành */}
          <div className="space-y-2">
            <Label htmlFor="major">Chuyên ngành</Label>
            <Input
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Ví dụ: Khoa học Máy tính"
              className="bg-[#1a1a1a] border-white/10"
            />
            {errors.major && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.major}
              </p>
            )}
          </div>

          {/* GPA and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="bg-[#1a1a1a] border-white/10"
              />
              {errors.gpa && (
                <p className="text-sm text-red-500 mt-1">
                  <AlertCircle className="inline-block mr-1 h-4 w-4" />
                  {errors.gpa}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="1"
                max="6"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-[#1a1a1a] border-white/10"
              />
              {errors.year && (
                <p className="text-sm text-red-500 mt-1">
                  <AlertCircle className="inline-block mr-1 h-4 w-4" />
                  {errors.year}
                </p>
              )}
            </div>
          </div>

          {/* Điểm mạnh */}
          <div className="space-y-2">
            <Label htmlFor="strengths">Điểm mạnh</Label>
            <div className="flex gap-2">
              <Input
                id="strengths"
                value={strengthInput}
                onChange={(e) => setStrengthInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip(strengthInput, setStrengths, strengths);
                    setStrengthInput("");
                  }
                }}
                placeholder="Nhập và nhấn Enter"
                className="bg-[#1a1a1a] border-white/10"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  addChip(strengthInput, setStrengths, strengths);
                  setStrengthInput("");
                }}
                className="border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {strengths.map((strength, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-amber-500/20 text-amber-300 border-amber-500/30 pl-3 pr-1.5 py-1.5"
                >
                  {strength}
                  <button
                    type="button"
                    onClick={() => removeChip(idx, setStrengths, strengths)}
                    className="ml-2 hover:bg-amber-500/30 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.strengths && (
              <p className="text-sm text-red-500 mt-1">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                {errors.strengths}
              </p>
            )}
          </div>

          {/* Ngôn ngữ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Ngôn ngữ</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addLanguage}
                className="h-8 border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Thêm
              </Button>
            </div>
            <div className="space-y-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={lang.key}
                    onChange={(e) => updateLanguage(idx, "key", e.target.value)}
                    placeholder="Ngôn ngữ"
                    className="bg-[#1a1a1a] border-white/10"
                  />
                  <Input
                    value={lang.value}
                    onChange={(e) => updateLanguage(idx, "value", e.target.value)}
                    placeholder="Trình độ"
                    className="bg-[#1a1a1a] border-white/10"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeLanguage(idx)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Thành tựu */}
          <div className="space-y-2">
            <Label htmlFor="achievements">Thành tựu</Label>
            <div className="flex gap-2">
              <Input
                id="achievements"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip(achievementInput, setAchievements, achievements);
                    setAchievementInput("");
                  }
                }}
                placeholder="Nhập và nhấn Enter"
                className="bg-[#1a1a1a] border-white/10"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  addChip(achievementInput, setAchievements, achievements);
                  setAchievementInput("");
                }}
                className="border-white/10 bg-[#1a1a1a]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-1 mt-2">
              {achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm bg-[#1a1a1a] px-3 py-2 rounded-md"
                >
                  <span className="flex-1">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => removeChip(idx, setAchievements, achievements)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tùy chọn Cố vấn */}
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-white/10">
            <div className="space-y-0.5">
              <Label htmlFor="mentor">Sẵn sàng Cố vấn</Label>
              <p className="text-sm text-muted-foreground">
                Sẵn sàng cố vấn người khác hoặc được cố vấn
              </p>
            </div>
            <Switch id="mentor" checked={mentor} onCheckedChange={setMentor} />
          </div>
        </CardContent>
      </Card>

      {/* Nút Hành động */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang phân tích...
            </>
          ) : (
            "Phân tích Hồ sơ"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isLoading}
          className="border-white/10 bg-[#1a1a1a]"
        >
          Đặt lại
        </Button>
      </div>
    </form>
  );
}
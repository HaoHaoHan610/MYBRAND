import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamSectionProps {
  breadcrumb?: string;
  title: string;
  description: string;
  members: TeamMember[];
  backgroundImage?: string; // URL to group photo for background
}

export function TeamSection({
  breadcrumb = "Team",
  title,
  description,
  members,
  backgroundImage,
}: TeamSectionProps) {
  return (
    <div className="w-full bg-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          {/* Overlay với gradient mờ để text vẫn đọc được - điều chỉnh độ mờ hợp lý */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
          {/* Gradient overlay để tạo depth và đảm bảo text rõ ràng */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/82 to-white/88" />
        </div>
      )}
      
      <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-10">
        {/* Header Block */}
        <div className="mb-10">
          {breadcrumb && (
            <div className="text-[12px] text-[#9AA0A6] mb-3 tracking-wide uppercase">
              {breadcrumb}
            </div>
          )}
          <h1 className="text-[56px] sm:text-[64px] font-bold leading-tight tracking-[-0.02em] text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-relaxed max-w-[520px]">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="bg-[#F3F4F6] rounded-[22px] p-[18px] sm:p-[22px] h-[360px] sm:h-[420px] transition-all duration-200 ease-out shadow-[0_6px_18px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                {/* Image Area - Top 70% */}
                <div className="relative h-[70%] mb-4 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[180px] sm:w-[200px] h-[240px] sm:h-[260px] relative">
                        {/* Cutout look with soft shadow */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              // Fallback to placeholder
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=F3F4F6&color=6B7280`;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Area - Bottom 30% */}
                <div className="h-[30%] flex flex-col justify-end">
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-900 mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-[#9CA3AF] leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Example usage
export function TeamSectionExample() {
  return (
    <TeamSection
      breadcrumb="Our Team"
      title="Meet the team"
      description="A group of passionate individuals working together to build something meaningful."
      members={[
        {
          name: "Nguyễn Văn A",
          role: "Nhóm trưởng",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        },
        {
          name: "Trần Thị B",
          role: "Thành viên",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        },
        {
          name: "Lê Văn C",
          role: "Thành viên",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        },
        {
          name: "Phạm Thị D",
          role: "Thành viên",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        },
      ]}
    />
  );
}


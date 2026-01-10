import React from "react";
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
    <div className="w-full bg-gradient-to-b from-gray-50 to-white relative overflow-hidden min-h-screen py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="text-center mb-12 sm:mb-16">
          {breadcrumb && (
            <div className="text-[12px] text-[#9AA0A6] mb-3 tracking-wide uppercase">
              {breadcrumb}
            </div>
          )}
          <h1 className="text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-tight tracking-[-0.02em] text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-relaxed max-w-[600px] mx-auto">
            {description}
          </p>
        </div>

        {/* Main Content Area with Group Photo and Overlay Members */}
        <div className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex items-center justify-center">
          {/* Group Photo - Centered */}
          {backgroundImage && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="relative w-full max-w-[900px] aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={backgroundImage}
                  alt="Team Group Photo"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle overlay to ensure member cards are readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />
              </div>
            </div>
          )}

          {/* Member Cards - Overlaying on Group Photo */}
          <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
            {members.map((member, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.15)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] border border-white/50 group-hover:border-white">
                  {/* Member Image */}
                  <div className="relative mb-4 flex items-center justify-center">
                    <div className="w-[120px] sm:w-[140px] h-[120px] sm:h-[140px] relative rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=F3F4F6&color=6B7280`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-gray-900 mb-1 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-[#6B7280] leading-relaxed">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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


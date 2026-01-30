// "use client";

import { IconType } from "react-icons";

type Logo = {
  name: string;
  icon: IconType;
  color: string;
};

type SkillsGridProps = {
  logos: Logo[];
};

export default function SkillsGrid({ logos }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex flex-col items-center justify-center text-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 hover:scale-110 transition-all cursor-pointer group"
        >
          <logo.icon
            size={48}
            style={{ color: logo.color }} // ✅ Dynamic inline style
            className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          />
          <span className="text-sm text-gray-300 font-medium">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}

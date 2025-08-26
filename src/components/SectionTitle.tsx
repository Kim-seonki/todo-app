// src/components/SectionTitle.tsx
import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  color?: "green" | "purple";
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children, color }) => {
  const colors = {
    green: "bg-green-600",
    purple: "bg-purple-600",
  };

  return (
    <h2
      className={`inline-block px-3 py-1 mb-6 text-white text-sm rounded-md font-semibold ${
        colors[color || "purple"]
      }`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;

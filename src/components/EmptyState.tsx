// src/components/EmptyState.tsx
import React from "react";

type EmptyStateProps = {
  message: string;
  imageSrc: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, imageSrc }) => {
  return (
    <div className="flex flex-col items-center text-gray-400">
      <img
        src={imageSrc}
        alt={message}
        className="w-40 h-40 object-contain mb-3"
      />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;

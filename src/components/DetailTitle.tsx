"use client";

import Image from "next/image";
import React, { useState } from "react";

type DetailTitleProps = {
  name: string; // 덮개 텍스트 (예: "청소하기")
  isCompleted: boolean;
  onToggle: (checked: boolean) => void;
  onNameChange?: (value: string) => void; // 이름 변경 콜백
};

const DetailTitle: React.FC<DetailTitleProps> = ({
  name,
  isCompleted,
  onToggle,
  onNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  // ✅ 엔터 또는 포커스 아웃 시 저장
  const handleSave = () => {
    setIsEditing(false);
    if (tempName.trim() === "") {
      setTempName(name); // 빈 값이면 원래 이름 복원
    } else if (onNameChange && tempName !== name) {
      onNameChange(tempName); // 변경된 경우에만 부모에게 전달
    }
  };

  return (
    <div
      className="relative w-full max-w-[1400px] h-[72px] cursor-pointer"
      onClick={() => !isEditing && onToggle(!isCompleted)} // 편집 중에는 토글 방지
    >
      {/* ✅ 배경 이미지 */}
      <Image
        src={isCompleted ? "/images/State=Active.png" : "/images/State=Default.png"}
        alt="할 일 상태"
        fill
        className="object-cover select-none"
        priority
      />

      {/* ✅ 글자 부분만 가리는 덮개 */}
      <div
        className={`
          absolute 
          top-1/2 left-[53.75%] transform
          -translate-x-1/2 -translate-y-1/2
          px-12 py-2
          rounded-md
          flex items-center justify-center
          z-10
          ${isCompleted ? "bg-[#D9D2FF]" : "bg-white"}
        `}
      >
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            autoFocus
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setTempName(name);
                setIsEditing(false);
              }
            }}
            className="text-lg font-semibold text-black bg-transparent outline-none border-b border-gray-400"
          />
        ) : (
          <span
            className="text-lg font-semibold text-black"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
};

export default DetailTitle;

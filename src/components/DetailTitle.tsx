// src/components/DetailTitle.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

type DetailTitleProps = {
  name: string;
  isCompleted: boolean;
  onToggle: (checked: boolean) => void;
  onNameChange?: (value: string) => void;
};

const DetailTitle: React.FC<DetailTitleProps> = ({
  name,
  isCompleted,
  onToggle,
  onNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    setIsEditing(false);
    if (!tempName.trim()) {
      setTempName(name);
      return;
    }
    if (onNameChange && tempName !== name) onNameChange(tempName);
  };

  return (
    <div className="relative w-full h-[64px] md:h-[64px] lg:h-[64px]">
      {/* 배경 이미지 (체크 아이콘 + 배경 포함) */}
      <Image
        src={isCompleted ? "/images/State=Active.png" : "/images/State=Default.png"}
        alt="할 일 상태"
        fill
        className="object-cover rounded select-none pointer-events-none"
        priority
      />

      {/* 체크 아이콘 클릭 영역(왼쪽 고정 폭) */}
      <button
        aria-label={isCompleted ? "미완료로 변경" : "완료로 변경"}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(!isCompleted);
        }}
        className="
          absolute top-0 h-full z-30 bg-transparent
          left-[12px] w-[56px]        /* 모바일: 아이콘 영역 */
          md:left-[20px] md:w-[64px]  /* 태블릿 */
          lg:left-[24px] lg:w-[72px]  /* 데스크톱 */
        "
      />

      {/* 덮개: **왼쪽 시작 위치 138px** 에서 width 179px (Figma 규격) */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2
          left-1/2 -translate-x-1/2
          w-[179px] h-[32px] rounded-md z-20
          ${isCompleted ? "bg-[#D9D2FF]" : "bg-white"}
          flex items-center justify-start
        `}
        style={{
          transform: "translate(calc(-50% + 41px), -50%)", // 중앙에서 +41px 이동
        }}
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
            className="
              bg-transparent outline-none
              text-[18px] md:text-[20px] font-semibold text-black
              w-[138px] text-left pl-2 truncate
            "
          />
        ) : (
          <span
            className="
              text-[18px] md:text-[20px] font-semibold text-black
              w-[138px] text-left pl-2 truncate cursor-text
            "
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

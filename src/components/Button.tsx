// src/components/Button.tsx

"use client";

import Image from "next/image";
import React from "react";

type VariantType = "add" | "edit" | "delete"; // ✅ 버튼 타입 확장
type VariantSize = "large";
type VariantState = "active" | "default";

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: VariantType;    // 필수 (버튼 타입)
  size?: VariantSize;   // 현재는 large만 지원
  state?: VariantState; // active | default
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  size = "large",
  state = "default",
  className,
}) => {
  // Figma 네이밍 규칙에 맞춰 파일 경로 생성
  const imageSrc = `/images/Type=${capitalize(type)}, Size=${capitalize(
    size
  )}, State=${capitalize(state)}.png`;

  // PNG에 맞는 width/height (공통 적용)
  const width = 168;
  const height = 56;

  return (
    <button onClick={onClick}>
      <Image
        src={imageSrc}
        alt={`${type} button`}
        width={width}
        height={height}
        className={className}
        priority
      />
    </button>
  );
};

// 첫 글자 대문자 변환 유틸
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Button;

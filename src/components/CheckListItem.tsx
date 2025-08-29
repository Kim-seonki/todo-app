"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

type CheckListItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
};

const CheckListItem: React.FC<CheckListItemProps> = ({
  id,
  name,
  isCompleted,
  onToggle,
}) => {
  // 항상 라이트모드 내부색 유지
  const coverColor = isCompleted ? "#E9E6FF" : "#FFFFFF";

  return (
    <div className="flex items-center justify-between p-2 rounded-lg w-full max-w-[560px]">
      <div className="flex items-center gap-2 w-full">
        <div className="relative w-full h-[44px] md:h-[48px] select-none">
          {/* 1) 배경 이미지 (포지션: 바닥) */}
          <Image
            src={isCompleted ? "/images/Variant2.png" : "/images/Default.png"}
            alt={isCompleted ? "완료된 항목" : "할 일 항목"}
            fill
            className="object-contain pointer-events-none rounded-full"
            priority={false}
          />

          {/* 2) 이미지 내부 예시 텍스트를 가리는 덮개 (모바일/데스크탑 분리) */}
          <div
            className="
              absolute top-1/2 -translate-y-1/2
              h-[26px] md:h-[28px]
              rounded-full pointer-events-none z-10
              left-[25px] right-[72px]
              md:left-[44px] md:right-[82px]
            "
            style={{ backgroundColor: coverColor }}
            data-testid="cover"
          />

          {/* 3) 오버레이: 버튼 / 텍스트 / 우측 여유 공간 */}
          <div className="absolute inset-0 flex items-center z-20">
            {/* 체크 버튼 (왼쪽 고정폭). z-index 높여서 항상 클릭 가능하게 함 */}
            <button
              aria-label={isCompleted ? "미완료로 변경" : "완료로 변경"}
              onClick={() => onToggle(id)}
              className="w-[56px] md:w-[68px] h-full flex items-center justify-center cursor-pointer z-30 bg-transparent"
            />

            {/* 텍스트 영역: flex-1 이므로 버튼 옆에서 시작. padding으로 내부 여백 조정 */}
            <Link href={`/items/${id}`} className="flex-1 flex items-center">
              <span
                className={[
                  "truncate text-[16px] md:text-[20px] font-semibold !text-black",
                  isCompleted ? "line-through text-gray-700" : "text-black",
                ].join(" ")}
              >
                {name}
              </span>
            </Link>

            {/* 오른쪽 하이라이트/여백 자리(이미지 내 우측 영역과 맞추기) */}
            <div className="w-[82px] md:w-[112px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckListItem;

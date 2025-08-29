// src/components/CheckList.tsx

"use client";

import React from "react";
import EmptyState from "./EmptyState";
import CheckListItem from "./CheckListItem";
import type { Item } from "@/types/item";
import Image from "next/image";

type Props = {
  title: "TODO" | "DONE"; // ✅ 띄어쓰기 없는 고정 값
  todos: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CheckList({ title, todos, onToggle, onDelete }: Props) {
  // ✅ title에 따라 아이콘 이미지 분기
  const iconSrc = title === "DONE" ? "/images/done.png" : "/images/todo.png";

  return (
    <section className="bg-white text-gray-900 rounded-3xl shadow-sm border border-gray-200 p-6">
      {/* ✅ PNG 아이콘으로만 타이틀 표시 */}
      <div className="mb-4">
        <Image src={iconSrc} alt={title} width={80} height={24} priority />
      </div>

      <div className="mt-4 space-y-2">
        {todos.length === 0 ? (
          <EmptyState
            message={title === "DONE" ? "완료된 일이 없습니다" : "할 일을 추가해보세요!"}
            imageSrc={title === "DONE" ? "/images/no_done.png" : "/images/no_todo.png"}
          />
        ) : (
          todos.map((t) => (
            <CheckListItem
              key={t.id}
              id={t.id}
              name={t.name}
              isCompleted={t.isCompleted}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    </section>
  );
}

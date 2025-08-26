"use client";

import React from "react";
import SectionTitle from "./SectionTitle";
import EmptyState from "./EmptyState";
import CheckListItem from "./CheckListItem";
import type { Item } from "@/types/item";

type Props = {
  title: "TO DO" | "TODO" | "DONE";
  todos: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CheckList({ title, todos, onToggle, onDelete }: Props) {
  const color = title === "DONE" ? "purple" : "green";

  return (
    <section className="bg-white text-gray-900 rounded-3xl shadow-sm border border-gray-200 p-6">
      <SectionTitle color={color}>{title}</SectionTitle>

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
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

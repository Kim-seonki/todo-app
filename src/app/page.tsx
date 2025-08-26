"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import CheckList from "@/components/CheckList";
import type { Item } from "@/types/item";
import { fetchItems, addItem, updateItem, deleteItem } from "@/lib/fetcher";

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // 초기 로딩
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 추가
  const addTodo = async (name: string) => {
    const created = await addItem(name);
    setItems((prev) => [...prev, created]);
  };

  // 토글
  const toggleTodo = async (id: number) => {
    const target = items.find((i) => i.id === id);
    if (!target) return;

    const next = !target.isCompleted;

    // 낙관적 업데이트
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isCompleted: next } : i)));

    try {
      await updateItem(id, { 
        name: target.name,
        memo: target.memo ?? "",
        imageUrl: target.imageUrl ?? "",
        isCompleted: !target.isCompleted, });
    } catch {
      // 실패시 롤백
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isCompleted: !next } : i)));
    }
  };

  // 삭제
  const removeTodo = async (id: number) => {
    const snapshot = items;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await deleteItem(id);
    } catch {
      setItems(snapshot); // 실패 시 복구
    }
  };

  const todos = items.filter((i) => !i.isCompleted);
  const dones = items.filter((i) => i.isCompleted);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* GNB */}
      <header className="bg-white text-gray-900 border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* ✅ 로고 경로/대소문자 통일: public/images/logo.png */}
            <Image src="/images/size=small@3x.png" alt="Logo" width={40} height={40} priority />
            <span className="text-xl font-extrabold text-purple-700">do it ;</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <SearchBar onAdd={addTodo} />
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">불러오는 중…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CheckList title="TO DO" todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
            <CheckList title="DONE" todos={dones} onToggle={toggleTodo} onDelete={removeTodo} />
          </div>
        )}
      </main>
    </div>
  );
}

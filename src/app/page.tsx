// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchItems, addItem, deleteItem, toggleItem } from "@/lib/fetcher";
import { Item } from "@/types/item";
import CheckList from "@/components/CheckList";
import SearchBar from "@/components/SearchBar"; // ✅ SearchBar만 사용

export default function HomePage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Item[]>([]);
  const [done, setDone] = useState<Item[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const items = await fetchItems();
      setTodos(items.filter((t) => !t.isCompleted));
      setDone(items.filter((t) => t.isCompleted));
    };
    loadData();
  }, []);

async function handleAdd(name: string) {
  if (!name.trim()) return;

  // 이미 동일한 name이 있는지 검사
  if (todos.some((t) => t.name === name) || done.some((t) => t.name === name)) {
    alert("이미 같은 할 일이 있습니다.");
    return;
  }

  const created = await addItem(name);
  setTodos((prev) => [...prev, created]);
}


  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 로고 헤더 */}
      <header className="flex items-center gap-2">
        <Link href="/" className="block cursor-pointer">
          <Image
            src="/images/logo_3x.png"
            alt="로고"
            width={200}
            height={200}
            priority
          />
        </Link>
      </header>

      {/* ✅ SearchBar만 사용 */}
      <SearchBar onAdd={handleAdd} />

      {/* 할 일 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CheckList
          title="TODO"
          todos={todos}
          onToggle={async (id) => {
            try {
              const updated = await toggleItem(id, true); // API 호출
              // ✅ 로컬 상태도 업데이트
              setTodos((prev) => prev.filter((t) => t.id !== id));
              setDone((prev) => [...prev, updated]);
            } catch (err) {
              console.error("토글 실패:", err);
            }
          }}
          onDelete={async (id) => {
            try {
              await deleteItem(id);
              setTodos((prev) => prev.filter((t) => t.id !== id));
            } catch (err) {
              console.error("삭제 실패:", err);
            }
          }}
        />

        <CheckList
          title="DONE"
          todos={done}
          onToggle={async (id) => {
            try {
              const updated = await toggleItem(id, false);
              setDone((prev) => prev.filter((t) => t.id !== id));
              setTodos((prev) => [...prev, updated]);
            } catch (err) {
              console.error("토글 실패:", err);
            }
          }}
          onDelete={async (id) => {
            try {
              await deleteItem(id);
              setDone((prev) => prev.filter((t) => t.id !== id));
            } catch (err) {
              console.error("삭제 실패:", err);
            }
          }}
        />
      </div>
    </main>
  );
}

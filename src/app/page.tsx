// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchItems, addItem, deleteItem, toggleItem } from "@/lib/fetcher";
import { Item } from "@/types/item";
import CheckList from "@/components/CheckList";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Item[]>([]);
  const [done, setDone] = useState<Item[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // ✅ 반응형 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    if (todos.some((t) => t.name === name) || done.some((t) => t.name === name)) {
      alert("이미 같은 할 일이 있습니다.");
      return;
    }

    const created = await addItem(name);
    setTodos((prev) => [...prev, created]);
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 로고 */}
      <header className="flex items-center gap-2">
        <Link href="/" className="block cursor-pointer">
          {isMobile ? (
            <Image
              src="/images/Small@3x.png" // ✅ 모바일 로고
              alt="모바일 로고"
              width={120}
              height={40}
              priority
            />
          ) : (
            <Image
              src="/images/logo_3x.png" // ✅ 데스크톱 로고
              alt="로고"
              width={200}
              height={200}
              priority
            />
          )}
        </Link>
      </header>

      {/* 입력창 + 추가 버튼 */}
      {isMobile ? (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="할 일을 입력해주세요"
            className="border rounded-lg px-4 py-2 flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                handleAdd(inputValue);
                setInputValue("");
              }
            }}
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                handleAdd(inputValue);
                setInputValue("");
              }
            }}
          >
            <Image
              src={
                inputValue.trim()
                  ? "/images/Type=Add, Size=Small, State=Active.png"
                  : "/images/Type=Add, Size=Small, State=Default.png"
              }
              alt="추가하기"
              width={48}
              height={48}
              priority
            />
          </button>
        </div>
      ) : (
        <SearchBar onAdd={handleAdd} />
      )}

      {/* 할 일 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CheckList
          title="TODO"
          todos={todos}
          onToggle={async (id) => {
            try {
              const updated = await toggleItem(id, true);
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

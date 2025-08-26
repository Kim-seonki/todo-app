// src/app/items/[itemId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { fetchItem, updateItem, deleteItem } from "@/lib/fetcher";
import { Item, UpdateItemDto } from "@/types/item";
import Button from "@/components/Button";

export default function TodoItemPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = Number(params.itemId);
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<UpdateItemDto>({
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItem(itemId);
        setItem(data);
        setForm({
          name: data.name,
          memo: data.memo,
          imageUrl: data.imageUrl,
          isCompleted: data.isCompleted,
        });
      } catch (error) {
        console.error("아이템 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!isNaN(itemId)) loadItem();
  }, [itemId]);

  async function handleUpdate() {
    try {
      await updateItem(itemId, form);
      router.push("/");
    } catch (err) {
      console.error("수정 실패:", err);
    }
  }

  async function handleDelete() {
    try {
      await deleteItem(itemId);
      router.push("/");
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (!item) return <p>아이템을 찾을 수 없습니다.</p>;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 로고 헤더 */}
      <header className="flex items-center gap-2">
        <Image src="/images/size=small@3x.png" alt="로고" width={40} height={40} />
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold text-purple-600 cursor-pointer"
        >
          do it ;
        </h1>
      </header>

      {/* 제목 + 완료체크 */}
      <div className="flex items-center gap-3 border rounded-full px-6 py-3">
        <input
          type="checkbox"
          checked={form.isCompleted}
          onChange={(e) => setForm({ ...form, isCompleted: e.target.checked })}
          className="w-5 h-5 accent-purple-600"
        />
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 text-lg font-medium focus:outline-none"
        />
      </div>

      {/* 이미지 + 메모 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-72 bg-gray-50 relative">
          {form.imageUrl ? (
            <Image
              src={form.imageUrl}
              alt="첨부 이미지"
              fill
              className="object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-5xl">📷</span>
              <span className="mt-2">이미지 없음</span>
              <button
                onClick={() => alert("이미지 업로드 기능 추가 예정")}
                className="absolute bottom-4 right-4 bg-gray-200 rounded-full p-2"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* 메모 영역 */}
        <div
          className="relative rounded-lg p-6"
          style={{
            backgroundImage: "url('/images/memo.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-center text-brown-700 font-bold mb-2">Memo</h2>
          <textarea
            value={form.memo || ""}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            className="w-full h-48 bg-transparent focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-4 justify-end">
        <Button variant="primary" onClick={handleUpdate}>
          ✓ 수정 완료
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          ✕ 삭제하기
        </Button>
      </div>
    </main>
  );
}

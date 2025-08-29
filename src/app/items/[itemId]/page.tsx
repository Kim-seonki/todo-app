// src/app/items/[itemId]/page.tsx
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // ✅ 변경 여부 체크
  const isChanged = useMemo(() => {
    if (!item) return false;
    return (
      form.name !== item.name ||
      form.memo !== (item.memo || "") ||
      form.imageUrl !== (item.imageUrl || "") ||
      form.isCompleted !== item.isCompleted
    );
  }, [form, item]);

  async function handleUpdate() {
    if (!isChanged) return; // 변경 없으면 업데이트 안함
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

  // ✅ 파일 업로드 처리
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // --- Validation ---
    const validName = /^[A-Za-z]+\.(jpg|jpeg|png)$/i;
    if (!validName.test(file.name)) {
      alert("파일 이름은 영어만 허용되며 확장자는 jpg, jpeg, png만 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // ✅ 미리보기용 URL 생성
    const url = URL.createObjectURL(file);
    setForm({ ...form, imageUrl: url });

    // 실제 업로드 처리 (예: 서버 API 호출) 추가 가능
    console.log("업로드할 파일:", file);
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
              <Image
                src="/images/img@3x.png"
                alt="이미지 없음"
                width={120}
                height={120}
                className="opacity-70"
              />
              <span className="mt-2">이미지 없음</span>
            </div>
          )}

          {/* 업로드 버튼 */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-gray-200 rounded-full p-2"
          >
            <Image
              src="/images/Type=Plus@3x.png"
              alt="이미지 업로드"
              width={48}
              height={48}
              priority
            />
          </button>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
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
        <Button
          type="edit"
          size="large"
          state={isChanged ? "active" : "default"}
          onClick={handleUpdate}
        >
          ✓ 수정 완료
        </Button>
        <Button
          type="delete"
          size="large"
          state="default"
          onClick={handleDelete}
        >
          ✕ 삭제하기
        </Button>
      </div>
    </main>
  );
}

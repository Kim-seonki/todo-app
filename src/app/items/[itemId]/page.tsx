// src/app/items/[itemId]/page.tsx
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchItem, updateItem, deleteItem } from "@/lib/fetcher";
import { Item, UpdateItemDto } from "@/types/item";
import Button from "@/components/Button";
import DetailTitle from "@/components/DetailTitle";

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

  // 변경 여부 체크
  const isChanged = useMemo(() => {
    if (!item) return false;
    return (
      form.name !== item.name ||
      (form.memo || "") !== (item.memo || "") ||
      (form.imageUrl || "") !== (item.imageUrl || "") ||
      form.isCompleted !== item.isCompleted
    );
  }, [form, item]);

  async function handleUpdate() {
    try {
      if (isChanged) {
        await updateItem(itemId, form); // 변경이 있을 경우 → 서버에 PATCH
      }
      router.push("/"); // 변경이 없어도 무조건 목록으로 이동
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

  // 파일 업로드 처리
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

    // 미리보기용 URL
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageUrl: url }));

    console.log("업로드할 파일:", file);
  }

  const hasImage = (url?: string | null): url is string =>
    !!url && url.trim() !== "";

  const isRemote = (url?: string | null) =>
    !!url && /^https?:\/\//i.test(url);

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
          {/* ✅ 데스크톱 전용 로고 */}
          <Image
            src="/images/logo_3x.png"
            alt="로고"
            width={200}
            height={200}
            priority
            className="hidden md:block" // md 이상에서만 보임
          />

          {/* ✅ 모바일 전용 로고 (업로드한 이미지 사용) */}
          <Image
            src="/images/Small@3x.png" // 업로드한 모바일 버전 파일 경로
            alt="모바일 로고"
            width={150}
            height={150}
            priority
            className="block md:hidden" // md 미만에서만 보임
          />
        </Link>
      </header>

      {/* 제목 + 완료체크 */}
      <div className="flex items-center border rounded-full h-10 px-4 pr-5">
        <DetailTitle
          name={form.name}
          isCompleted={form.isCompleted}
          onToggle={(checked) => setForm({ ...form, isCompleted: checked })}
          onNameChange={(value) => setForm({ ...form, name: value })}
        />
      </div>

      {/* 이미지 + 메모 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-72 bg-gray-50 relative">
          {hasImage(form.imageUrl) ? (
            <Image
              src={form.imageUrl}
              alt="첨부 이미지"
              fill
              className="object-contain rounded-lg"
              // 외부 URL이면 도메인 등록 전에도 보이도록 우선 비최적화
              unoptimized={isRemote(form.imageUrl)}
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
          <h2 className="text-center font-bold mb-2 !text-black">
            Memo
          </h2>
          <textarea
            value={form.memo || ""}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            className="w-full h-48 bg-transparent focus:outline-none resize-none text-[#000000] caret-black placeholder-gray-500 dark:!placeholder-gray-500"
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

import type { Item, CreateItemDto, UpdateItemDto } from "@/types/item";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "xippaz";

// 안전한 apiFetch
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}/${TENANT_ID}/items${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
  console.log("📡 요청 URL:", url, "옵션:", options);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const text = await res.text(); // 원본 응답 로깅
  console.log("📩 응답 상태:", res.status, "본문:", text);

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status} ${text}`);
  }

  try {
    return JSON.parse(text); // 안전 JSON 파싱
  } catch {
    throw new Error(`응답 JSON 파싱 실패: ${text}`);
  }
}



// 📌 할 일 목록 조회
export async function fetchItems(): Promise<Item[]> {
  return apiFetch<Item[]>("", {
    cache: "no-store"
  });
}

// 📌 단일 할 일 조회
export async function fetchItem(id: number): Promise<Item> {
  return apiFetch<Item>(`/${id}`);
}

// 📌 새 할 일 추가
export async function addItem(name: string): Promise<Item> {
  return apiFetch<Item>("", {
    method: "POST",
    body: JSON.stringify({ name })
  });
}

// 📌 할 일 수정
export async function updateItem(id: number, data: UpdateItemDto): Promise<Item> {
  return apiFetch<Item>(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: data.name ?? "",
      memo: data.memo ?? "",
      imageUrl: data.imageUrl ?? "",
      isCompleted: data.isCompleted ?? false
    }),
  });
}

// 📌 할 일 완료/미완료 토글
export async function toggleItem(id: number, isCompleted: boolean): Promise<Item> {
  const currentItem = await fetchItem(id);

  // 🚨 undefined가 아닌 값으로 모두 채움
  const body = {
    name: currentItem.name,
    memo: currentItem.memo ?? "",        // null이면 빈 문자열
    imageUrl: currentItem.imageUrl ?? "",// null이면 빈 문자열
    isCompleted: !currentItem.isCompleted,
  };

  console.log("📦 토글 요청 Body:", body);

  return apiFetch<Item>(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// 📌 할 일 삭제
export async function deleteItem(id: number): Promise<boolean> {
  try {
    const result = await apiFetch<{}>(`/${id}`, { method: "DELETE" });
    console.log("🗑 삭제 성공:", result);
    return true;
  } catch (err) {
    console.error("❌ 삭제 에러:", err);
    throw err;
  }
}




// 📌 이미지 업로드
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  return res.json();
}
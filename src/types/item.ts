// src/types/item.ts

export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export interface CreateItemDto {
  name: string;
}

export interface UpdateItemDto {
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

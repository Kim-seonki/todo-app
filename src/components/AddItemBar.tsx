// src/components/AddItemBar.tsx
"use client";

import React, { useState, KeyboardEvent } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

type AddItemBarProps = {
  /** 생성 로직을 주입하세요. 성공 시 내부에서 입력값을 비웁니다. */
  onAdd: (name: string) => Promise<void> | void;
  /** placeholder 커스터마이즈 */
  placeholder?: string;
};

const AddItemBar: React.FC<AddItemBarProps> = ({ onAdd, placeholder }) => {
  const [value, setValue] = useState("");

  const trimmed = value.trim();
  const isActive = trimmed.length > 0;

  const fireAdd = async () => {
    if (!isActive) return;
    await onAdd(trimmed);
    setValue(""); // 성공/실패 관계없이 초기화가 싫다면 try/catch로 조정하세요.
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await fireAdd();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder ?? "할 일을 입력해주세요"}
        className="flex-1 bg-gray-100"
      />
      <Button
        type="add"
        size="large"
        state={isActive ? "active" : "default"}
        onClick={fireAdd}
      >
        + 추가하기
      </Button>
    </div>
  );
};

export default AddItemBar;

"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Input from "./Input";

type SearchBarProps = {
  onAdd: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  const isEmpty = !value.trim();

  return (
    <div className="flex items-center gap-3 w-full max-w-2xl">
      {/* 검색바 이미지 + 입력창 */}
      <div className="relative flex-1 h-[56px]">
        {/* 배경 이미지 */}
        <Image
          src="/images/search.png"
          alt="Search Background"
          fill
          className="object-fill"
        />

        {/* 실제 입력 영역 */}
        <div className="absolute inset-0 z-10 flex items-center px-4">
          <Input
            className="
              w-full border-none bg-transparent px-3 py-2
              text-slate-900
              caret-slate-900
              placeholder-slate-500
              focus:outline-none focus:ring-0
            "
            placeholder="할 일을 입력해주세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>
      </div>

      {/* 추가 버튼 */}
      <Button
        onClick={handleAdd}
        type="add"
        size="large"
        state={isEmpty ? "default" : "active"}
      >
        + 추가하기
      </Button>
    </div>
  );
};

export default SearchBar;
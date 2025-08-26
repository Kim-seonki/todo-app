"use client";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

type SearchBarProps = {
  onAdd: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  // ✅ 공통으로 사용할 추가 함수
  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 w-full">
      <Input className="w-full border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"

        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // 폼 제출 방지
            handleAdd();        // ✅ 여기서 호출 가능
          }
        }}
      />
      <Button onClick={handleAdd} variant="primary">
        + 추가하기
      </Button>
    </div>
  );
};

export default SearchBar;

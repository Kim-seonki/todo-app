// src/components/TodoInput.tsx
"use client";

import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const TodoInput: React.FC = () => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    console.log("추가된 할 일:", value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-gray-300 text-gray-800 placeholder-gray-600 rounded-full"
      />
      <Button
        type="add"
        size="large"
        state={value.trim() ? "active" : "default"}
        onClick={handleAdd}
      >
        + 추가하기
      </Button>
    </div>
  );
};

export default TodoInput;

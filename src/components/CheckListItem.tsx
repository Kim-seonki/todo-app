"use client";

import Link from "next/link";

type CheckListItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const CheckListItem: React.FC<CheckListItemProps> = ({
  id,
  name,
  isCompleted,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between border rounded p-2 bg-white">
      {/* 왼쪽: 체크박스 + 텍스트 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!isCompleted}
          onChange={() => onToggle(id)}
          className="cursor-pointer"
        />
        {/* 상세페이지 이동 */}
        <Link href={`/items/${id}`}>
          <span className="text-gray-900">{name}</span>
        </Link>
      </div>

      {/* 오른쪽: 삭제 버튼 */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        삭제
      </button>
    </div>
  );
};

export default CheckListItem;

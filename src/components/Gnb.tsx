// src/components/Gnb.tsx
import React from "react";

import Image from "next/image";
import Link from "next/link";

const Gnb = () => {
  return (
    <header className="w-full flex items-center p-4 border-b">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/images/logo_3x.png" // ✅ 소문자 이름으로 통일
            alt="Logo"
            className="h-8"
        />
          <span className="text-xl font-bold text-purple-700">do it ;</span>
        </div>
      </Link>
    </header>
  );
};

export default Gnb;

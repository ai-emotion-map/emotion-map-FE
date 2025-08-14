"use client";

import React, { useState } from "react";
import { Home, MapPin, Book, Pencil } from "lucide-react";

const cards = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  color:
    ["bg-green-100", "bg-blue-100", "bg-emerald-200", "bg-indigo-100"][
      i % 4
    ],
}));

export default function Page() {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div className="flex flex-col min-h-dvh w-full max-w-sm mx-auto bg-white">
      {/* 헤더 */}
      <header className="shrink-0 p-4 bg-white fixed top-0 left-0 right-0 z-20 w-full max-w-sm mx-auto">
        <h1 className="text-xl font-semibold">emomap</h1>
        <div className="mt-2 text-sm flex gap-4">
          <button
            onClick={() => setSortBy("latest")}
            className={`font-semibold ${
              sortBy === "latest" ? "text-black" : "text-gray-500"
            }`}
          >
            · 최신순
          </button>
          <button
            onClick={() => setSortBy("location")}
            className={`font-semibold ${
              sortBy === "location" ? "text-black" : "text-gray-500"
            }`}
          >
            · 장소중심 정렬
          </button>
        </div>
      </header>

      {/* 메인: 스크롤 영역 (header 아래에서 시작) */}
  <main className="flex-1 overflow-y-auto px-4 pb-20 pt-20 bg-white">
        {/* 검색창 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="당신이 몰랐던 감정의 장소를 발견해보세요"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* 카드 그리드 (간단 Masonry 느낌) */}
        <div className="grid grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <article
              key={c.id}
              className={`rounded-xl p-3 ${c.color}`}
            >
              <div className="bg-gray-300/70 rounded-lg h-24 mb-2 flex items-center justify-center text-sm text-gray-700">
                사진
              </div>
              <p className="text-sm font-medium">위치</p>
              <p className="text-xs text-gray-600">첫 문장</p>
              <p className="text-xs text-gray-500">감성 태그</p>
            </article>
          ))}
        </div>
      </main>

  {/* ...중복 navbar 제거, layout의 navbar만 사용... */}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Home, MapPin, Book, Pencil } from "lucide-react";
import Tag, { type TagProps } from "../components/common/tag/Tag";
import TagTicker from "../components/TagTicker";

export type Card = {
  id: number;
  color: string;
  overlayOpacity: string;
  imageHeight: number;
};

export const TAG_LIST: TagProps[] = [
  { color: "#fffceeff", shadowColor: "#ece49dff", text: "가족 🏠" },
  { color: "#f6faffff", shadowColor: "#9ed5f1ff", text: "우정 🤝" },
  { color: "#f4fcf6ff", shadowColor: "#83cc91ff", text: "위로 🌱" },
  { color: "#faedffff", shadowColor: "#d7a5f0ff", text: "외로움 🌙" },
  { color: "#fbecf3ff", shadowColor: "#e2a7deff", text: "사랑 💌" },
  { color: "#fdf0efff", shadowColor: "#f3b4b5ff", text: "향수 🌿" },
];

export default function FeedClient({ cards }: { cards: Card[] }) {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div className="flex sticky flex-col h-full relative">
      {/* 검색창 */}
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="당신이 몰랐던 감정의 장소를 발견해보세요"
          className="w-full bg-background rounded-xl border-[3px] hover:bg-[#F5F5F5] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      
      {/* 정렬 */}
      <div className="shrink-0  pb-2 top-0 z-20 w-full max-w-sm mx-auto bg-background">
        <div className=" text-sm flex gap-4">
          <button
            onClick={() => setSortBy("latest")}
            className={`font-semibold px-2 py-1 rounded-xl transition-colors duration-200 hover:bg-gray-100 ${
              sortBy === "latest" ? "text-black" : "text-gray-400"
            }`}
          >
            · 최신순
          </button>
          <button
            onClick={() => setSortBy("location")}
            className={`font-semibold px-2 py-1 rounded-xl transition-colors duration-200 hover:bg-gray-100 ${
              sortBy === "location" ? "text-black" : "text-gray-400"
            }`}
          >
            · 장소중심 정렬
          </button>
        </div>
        
      
    
      </div>

      {/* Masonry 카드 그리드만 스크롤 */}
      <div className="flex-1 overflow-auto px-1 pb-2 w-full">

        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards.map((c, i) => (
            <article
              key={c.id}
              className={`relative p-3 rounded-xl box-shadow-inset ${c.color} hover:brightness-90 transition-all duration-200`}
              style={{ overflow: 'hidden' }}
            >
              {/* 흰색 오버레이 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `rgba(245, 245, 245,${c.overlayOpacity})`,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
              <div className="relative z-10">
                <div
                  className="bg-gray-300/70 rounded-lg overflow-hidden mb-2 flex items-center justify-center text-sm text-gray-700"
                  style={{ height: `${c.imageHeight}px` }}
                >
                  사진
                  {/* <img src={item.src} alt="" className="absolute inset-0 w-full h-full object-cover" /> */}
                </div>
                <p className="text-sm font-medium line-clamp-1">정릉기숙사</p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  <span> line-clamp-1 클래스를 사용하면 한 줄만 보이게 할 수 있습니다.</span>
                </p>
                
                <div className="flex gap-2 overflow-x-auto pt-2 whitespace-nowrap">
                  {TAG_LIST.map((tag, idx) => (
                    <Tag
                      key={idx}
                      color={tag.color}
                      shadowColor={tag.shadowColor}
                      text={tag.text}
                      
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Masonry>
      </div>

    </div>
  );
}
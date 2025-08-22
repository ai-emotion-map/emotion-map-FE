"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Tag from "../components/common/tag/Tag";
import { type TagProps } from "../components/common/tag/tag";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export type Card = {
  id: number;
  color: string;
  overlayOpacity: string;
  imageHeight: number;
  imageUrl?: string;
};

export const TAG_LIST: TagProps[] = [
  { variant: "가족 🏠" },
  { variant: "우정 🤝" },
  { variant: "위로/치유 🌱" },
  { variant: "외로움 🌙" },
  { variant: "설렘/사랑 💌" },
  { variant: "향수 🌿" },
];

export default function FeedClient({ cards: initialCards }: { cards: Card[] }) {
  const [sortBy, setSortBy] = useState("latest");
  const [cards, setCards] = useState(initialCards);
  const router = useRouter();

  const handleImageError = (cardId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, imageUrl: undefined } : card
      )
    );
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* 검색창 */}
      <div className="relative flex items-center mt-1 mb-4">
        <input
          type="text"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="당신이 몰랐던 감정의 장소를 발견해보세요"
          className="focus:outline-none text-base w-full z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
        />
        <Search
          className="absolute z-10 text-base cursor-pointer right-3"
          color="#a6a6a6"
          size={18}
          // onClick={handleSearch}
        />
      </div>

      {/* Masonry 카드 그리드 */}
      <div className="flex-1 w-full px-1 pb-2 overflow-auto">
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards.map((c) => (
            <article
              key={c.id}
              className={`relative p-3 rounded-xl box-shadow-inset ${c.color} hover:brightness-90 transition-all duration-200 cursor-pointer`}
              style={{ overflow: "hidden" }}
              onClick={() => router.push("/detail")}
            >
              {/* 흰색 오버레이 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `rgba(245, 245, 245,${c.overlayOpacity})`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              {/* 사진 */}
              <div className="relative z-10">
                {c.imageUrl && (
                  <div
                    className="flex items-center justify-center mb-2 overflow-hidden text-sm text-gray-700 rounded-lg bg-gray-300/70"
                    style={{ height: `${c.imageHeight}px` }}
                  >
                    <img
                      src={c.imageUrl}
                      alt="피드 이미지"
                      className="object-cover w-full h-full"
                      onError={() => handleImageError(c.id)}
                    />
                  </div>
                )}

                {/* 텍스트 */}
                <p className="text-sm font-medium line-clamp-1">정릉기숙사</p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  <span>
                    line-clamp-1 클래스를 사용하면 한 줄만 보이게 할 수
                    있습니다.
                  </span>
                </p>

                <div className="flex gap-2 pt-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {TAG_LIST.map((tag) => (
                    <Tag key={tag.variant} variant={tag.variant} type="small" />
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

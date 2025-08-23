"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Tag from "../components/common/tag/Tag";
import { TAG_MAP, type TagProps } from "../components/common/tag/tag";

import { useRouter } from "next/navigation";

export type Card = {
  id: number;
  color: string;
  overlayOpacity: string;
  imageHeight: number;
  imageUrl?: string;
  roadAddress: string;
  tags: string[];
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
    <div className="relative sticky flex flex-col h-full">
      {/* 검색창 */}
      <div className="mb-4 mt-1">
        <input
          type="text"
          placeholder="당신이 몰랐던 감정의 장소를 발견해보세요"
          className="w-full bg-background rounded-xl border-[3px] hover:bg-[#F5F5F5] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
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
              onClick={() => router.push(`/detail/${c.id}`)}
            >
              {/* 흰색 오버레이 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `rgba(245, 245, 245, ${c.overlayOpacity})`,
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
                      alt={c.roadAddress}
                      className="object-cover w-full h-full"
                      onError={() => handleImageError(c.id)}
                    />
                  </div>
                )}
                <p className="text-sm font-medium line-clamp-1">
                  {c.roadAddress}
                </p>
                <div className="flex gap-2 pt-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {c.tags
                    .map((tag) => TAG_MAP[tag as keyof typeof TAG_MAP]) // API 응답 → 프론트 변환
                    .filter((mappedTag) => mappedTag) // 매칭 안 되면 제외
                    .map((mappedTag) => (
                      <Tag
                        key={mappedTag}
                        variant={mappedTag}
                        type="small"
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

'use client';

import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import Tag from "../components/common/tag/Tag";
import { TAG_MAP, type TagProps } from "../components/common/tag/tag";
import { useRouter } from "next/navigation";
import { getCards } from "./actions"; // Import the server action

export type Card = {
  id: number;
  color: string;
  overlayOpacity: string;
  imageHeight: number;
  imageUrl?: string;
  roadAddress: string;
  tags: string[];
  placeName: string;
  content: string;
};

export const TAG_LIST: TagProps[] = [
  { variant: "가족 🏠" },
  { variant: "우정 🤝" },
  { variant: "위로/치유 🌱" },
  { variant: "외로움 🌙" },
  { variant: "설렘/사랑 💌" },
  { variant: "향수 🌿" },
];

type FeedClientProps = { initialCards: Card[] };

export default function FeedClient({ initialCards }: FeedClientProps) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const router = useRouter();

  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(true);
  const loadingRef = useRef<boolean>(false);

  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = (cardId: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, imageUrl: undefined } : c))
    );
  };

  const loadMore = async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    try {
      const page = pageRef.current;
      const { cards: nextCards, isLast } = await getCards(page, 20); // Call server action
      setCards((prev) => [...prev, ...nextCards]);

      hasMoreRef.current = !isLast;
      pageRef.current = page + 1;
    } catch (e) {
      console.error(e);
      hasMoreRef.current = false;
    } finally {
      loadingRef.current = false;
    }
  };

  // Fallback for when server doesn't provide initial cards.
  useEffect(() => {
    (async () => {
      if (initialCards && initialCards.length > 0) return;
      loadingRef.current = true;
      try {
        const { cards: firstCards, isLast } = await getCards(0, 20);
        setCards(firstCards);
        hasMoreRef.current = !isLast;
        pageRef.current = 1;
      } catch (e) {
        console.error(e);
        hasMoreRef.current = false;
      } finally {
        loadingRef.current = false;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver setup
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      {
        root: scrollRootRef.current ?? null,
        rootMargin: "300px",
        threshold: 0,
      }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* Masonry 카드 그리드 + 내부 스크롤 컨테이너 */}
      <div ref={scrollRootRef} className="flex-1 w-full px-1 pb-2 overflow-auto">
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards.map((c) => (
            <article
              key={`${c.id}-${c.imageUrl ?? "noimg"}`}
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
              {/* 사진/텍스트 */}
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
                <h3 className="font-bold text-base line-clamp-2 mb-1">{c.placeName}</h3>
                <p className="text-xs font-medium line-clamp-1 text-gray-500">{c.roadAddress}</p>
                <p className="text-sm mt-2 line-clamp-2">{c.content}</p>
                <div className="flex gap-2 pt-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {c.tags
                    .map((tag) => TAG_MAP[tag as keyof typeof TAG_MAP])
                    .filter(Boolean)
                    .map((mappedTag) => (
                      <Tag key={mappedTag} variant={mappedTag} type="small" />
                    ))}
                </div>
              </div>
            </article>
          ))}
        </Masonry>

        {/* 센티널 */}
        <div ref={sentinelRef} className="h-10" />

        {/* 로딩/끝 상태 */}
        {loadingRef.current && (
          <p className="py-3 text-center text-sm text-gray-500">불러오는 중…</p>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import Masonry from "react-masonry-css";
import Tag from "../components/common/tag/Tag";
import { TAG_MAP, type TagProps } from "../components/common/tag/tag.types";
import { useRouter } from "next/navigation";
import { getCards, searchCards } from "./actions"; // Import both server actions

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
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const pageRef = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(true);
  const loadingRef = useRef<boolean>(false);
  const searchKeywordRef = useRef<string>(""); // To hold the current search term for pagination

  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = (cardId: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, imageUrl: undefined } : c))
    );
  };

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    try {
      const page = pageRef.current;
      const result = searchKeywordRef.current
        ? await searchCards(searchKeywordRef.current, page, 20)
        : await getCards(page, 20);

      setCards((prev) => [...prev, ...result.cards]);
      hasMoreRef.current = !result.isLast;
      pageRef.current = page + 1;
    } catch (e) {
      console.error(e);
      hasMoreRef.current = false; // Stop trying on error
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    searchKeywordRef.current = trimmedQuery;

    loadingRef.current = true;
    setCards([]); // Clear existing cards
    pageRef.current = 0; // Reset page for new search/feed
    hasMoreRef.current = true; // Assume there's more until told otherwise

    try {
        const page = pageRef.current;
        const result = trimmedQuery
            ? await searchCards(trimmedQuery, page, 20)
            : await getCards(page, 20);
        
        setCards(result.cards);
        hasMoreRef.current = !result.isLast;
        pageRef.current = 1;
    } catch (e) {
        console.error(e);
        hasMoreRef.current = false;
    } finally {
        loadingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Initial load effect
  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  // IntersectionObserver setup
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: scrollRootRef.current ?? null,
        rootMargin: "300px",
        threshold: 0,
      }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="relative sticky flex flex-col h-full">
      <div className="mt-1 mb-4">
        <input
          type="text"
          placeholder="사람들의 이야기가 깃든 장소를 찾아보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-background rounded-xl border-[3px] hover:bg-[#F5F5F5] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      <div
        ref={scrollRootRef}
        className="flex-1 w-full px-1 pb-2 overflow-auto"
      >
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `rgba(245, 245, 245, ${c.overlayOpacity})`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
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
                      <Tag key={mappedTag} variant={mappedTag} type="default" />
                    ))}
                </div>
              </div>
            </article>
          ))}
        </Masonry>

        <div ref={sentinelRef} className="h-10" />
        {loadingRef.current && (
          <p className="py-3 text-center text-sm text-gray-500">불러오는 중…</p>
        )}
        
        {!loadingRef.current && cards.length === 0 && (
            <p className="py-3 text-center text-sm text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import Tag from "../components/common/tag/Tag";
import { TAG_MAP, type TagProps } from "../components/common/tag/tag.types";
import { useRouter } from "next/navigation";
import { getLatestPosts } from "@/api/apiFeed"; // (page:number, size:number)

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

// API → Card 변환
function mapPostsToCards(posts: any[]): Card[] {
  const colors = [
    "bg-feed-blue1",
    "bg-feed-green1",
    "bg-feed-blue2",
    "bg-feed-green2",
    "bg-feed-blue3",
    "bg-feed-green3",
  ];
  return posts.map((post) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const overlayOpacity = (Math.random() * 0.4 + 0.5).toFixed(2);
    return {
      id: post.id,
      color: randomColor,
      overlayOpacity,
      imageHeight: 200,
      imageUrl: post.thumbnailUrl ?? undefined,
      roadAddress: post.roadAddress,
      tags: post.tags,
    } as Card;
  });
}

type FeedClientProps = { cards: Card[] }; // 서버에서 page=0 내려줬다고 가정

export default function FeedClient({ cards: initialCards }: FeedClientProps) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const router = useRouter();

  // 페이지네이션 상태
  const pageRef = useRef<number>(1); // 다음 요청할 페이지 (초기 0을 받았으니 1부터)
  const hasMoreRef = useRef<boolean>(true);
  const loadingRef = useRef<boolean>(false);

  // 스크롤 컨테이너/센티널
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = (cardId: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, imageUrl: undefined } : c))
    );
  };

  // 더 불러오기
  const loadMore = async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    try {
      const page = pageRef.current;
      const resp = await getLatestPosts(page, 20); // ✅ 위치 인자만 사용
      const nextCards = mapPostsToCards(resp?.content ?? []);
      setCards((prev) => [...prev, ...nextCards]);

      hasMoreRef.current = !(resp?.last === true || nextCards.length === 0);
      pageRef.current = page + 1;
    } catch (e) {
      console.error(e);
      hasMoreRef.current = false;
    } finally {
      loadingRef.current = false;
    }
  };

  // 최초 마운트 시, initialCards 없으면 0페이지 로드
  useEffect(() => {
    (async () => {
      if (initialCards && initialCards.length > 0) return;
      loadingRef.current = true;
      try {
        const resp = await getLatestPosts(0, 20);
        const first = mapPostsToCards(resp?.content ?? []);
        setCards(first);
        hasMoreRef.current = !(resp?.last === true || first.length === 0);
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

  // IntersectionObserver 등록
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) loadMore();
      },
      {
        root: scrollRootRef.current ?? null, // 내부 스크롤 컨테이너
        rootMargin: "300px", // 미리 당겨서
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
      <div className="mt-1 mb-4">
        <input
          type="text"
          placeholder="당신이 몰랐던 감정의 장소를 발견해보세요"
          className="w-full bg-background rounded-xl border-[3px] hover:bg-[#F5F5F5] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Masonry 카드 그리드 + 내부 스크롤 컨테이너 */}
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
                <p className="text-sm font-medium line-clamp-1">
                  {c.roadAddress}
                </p>
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
          <p className="py-3 text-sm text-center text-gray-500">불러오는 중…</p>
        )}
      </div>
    </div>
  );
}

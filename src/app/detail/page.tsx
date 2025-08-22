"use client";

import React, { useState } from "react";
import Tag from "../components/common/tag/Tag";
import { TagVariant } from "../components/common/tag/tag";
import NaverMap from "../components/navermap/NaverMap";
import Button from "../components/common/button/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const DetailPage = () => {
  const [selectedMarker] = useState<{
    lat: number;
    lng: number;
    emotion: TagVariant;
  } | null>({
    lat: 37.5665,
    lng: 126.978,
    emotion: "가족 🏠",
  });

  const data = {
    title: "서울특별시청",
    address: "장소 주소",
    content:
      "장소에 대한 설명이나 리뷰가 여기에 들어갑니다. 장소에 대한 설명이나 리뷰가 여기에 들어갑니다. 장소에 대한 설명이나 리뷰가 여기에 들어갑니다.",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    ],
    tags: ["가족 🏠", "우정 🤝", "위로/치유 🌱", "외로움 🌙"] as const,
  };

  const router = useRouter();

  function openNaverDirections(destinationName: string) {
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(destinationName)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="relative flex flex-col w-full min-h-screen p-4 bg-background">
      <div className="flex flex-col flex-1 gap-4">
        {/* 제목 */}
        <div>
          <h2 className="mb-1 text-lg font-bold">{data.title}</h2>
          <h4 className="text-sm">{data.address}</h4>
        </div>

        <X
          className="absolute cursor-pointer top-3 right-4"
          color="#a6a6a6"
          onClick={() => router.back()}
        />

        {/* 이미지 & 내용 */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {data.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={data.title}
                className="w-full h-auto rounded-lg max-h-72"
              />
            ))}
          </div>
          <p>{data.content}</p>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 py-1">
          {data.tags.map((tag) => (
            <Tag key={tag} variant={tag} />
          ))}
        </div>

        {/* 지도 & 버튼 */}
        <div className="flex-shrink-0">
          <NaverMap
            markers={selectedMarker ? [selectedMarker] : []}
            height="170px"
            options={{
              draggable: false, // 지도 드래그 금지
              pinchZoom: false, // 모바일 핀치 확대 금지
              scrollWheel: false, // 마우스 휠 확대 금지
              keyboardShortcuts: false,
              disableDoubleClickZoom: true,
            }}
            zoom={16}
          />
        </div>

        <div className="mb-3">
          <Button
            onClick={() => {
              if (selectedMarker) {
                openNaverDirections(data.title);
              }
            }}
          >
            장소 검색하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

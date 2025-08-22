"use client";

import React, { useState } from "react";
import Tag from "../components/common/tag/Tag";
import { TagVariant } from "../components/common/tag/tag";
import NaverMap from "../components/navermap/NaverMap";
import { Search } from "lucide-react";
import BottomSheet from "../components/BottomSheet";

const Page = () => {
  const markers = [
    { lat: 37.5665, lng: 126.978, emotion: "가족 🏠" as TagVariant },
  ];
  const tags = [
    "가족 🏠",
    "우정 🤝",
    "위로/치유 🌱",
    "외로움 🌙",
    "설렘/사랑 💌",
    "향수 🌿",
  ] as const;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState<TagVariant[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<null | {
    lat: number;
    lng: number;
    emotion: TagVariant;
  }>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] gap-3 pt-2">
      {/* 검색창 */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="다양한 이야기를 검색해 보세요!"
          className="focus:outline-none text-sm w-full z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
        />
        <Search
          className="absolute z-10 text-base cursor-pointer right-3"
          color="#a6a6a6"
          size={18}
          onClick={handleSearch}
        />
      </div>

      {/* 태그 */}
      <div className="flex gap-2 py-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant={tag}
            isActive={searchTag.includes(tag)}
            onClick={() => setSearchTag([tag])}
          />
        ))}
      </div>

      {/* 지도 */}
      <div className="relative flex-1">
        <NaverMap
          markers={markers}
          zoom={12}
          onMarkerClick={(marker) => {
            setSelectedMarker(marker);
            setIsOpen(true);
            setIsExpanded(false); // 처음은 반만 열림
          }}
          height="95%"
        />

        {/* ✅ 바텀시트 */}
        {isOpen && (
          <BottomSheet
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            selectedMarker={selectedMarker}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Page;

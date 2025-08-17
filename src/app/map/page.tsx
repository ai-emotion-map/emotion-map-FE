"use client";

import React, { useState } from "react";
import Tag, { TagVariant } from "../components/common/tag/Tag";
import NaverMap from "../components/navermap/NaverMap";
import { Search } from "lucide-react";

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

  const tagToServerKey: Record<TagVariant, string> = {
    "가족 🏠": "가족",
    "우정 🤝": "우정",
    "위로/치유 🌱": "위로/치유",
    "외로움 🌙": "외로움",
    "설렘/사랑 💌": "설렘/사랑",
    "향수 🌿": "향수",
  };

  const [searchTag, setSearchTag] = useState<TagVariant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    // 검색 로직 구현
    console.log(searchTerm);
  };

  return (
    <div className="flex flex-col min-h-full gap-3 pt-2">
      <div className="flex gap-2 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant={tag}
            onClick={() => {
              setSearchTag([tag]);
              console.log(tagToServerKey[tag]);
            }}
            isActive={searchTag.includes(tag)}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center flex-1 gap-10">
        <div className="absolute flex items-center top-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="다양한 이야기를 검색해 보세요!"
            className="focus:outline-none text-sm w-[320px] z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
          />
          <Search
            className="absolute z-10 text-base cursor-pointer right-3"
            color="#a6a6a6"
            size={18}
            onClick={handleSearch}
          />
        </div>
        <NaverMap markers={markers} zoom={12} height="520px" />
      </div>
    </div>
  );
};

export default Page;

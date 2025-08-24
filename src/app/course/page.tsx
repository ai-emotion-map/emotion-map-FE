"use client";

import React, { useState } from "react";
import Button from "../components/common/button/Button";
import { useRouter } from "next/navigation";
import { TagVariant } from "../components/common/tag/tag.types";

const tags = [
  "가족 🏠",
  "우정 🤝",
  "위로/치유 🌱",
  "외로움 🌙",
  "설렘/사랑 💌",
  "향수 🌿",
  "기쁨/신남 🎉",
  "화남/분노 😡",
];

const Page = () => {
  const [selectedTag, setSelectedTag] = useState<TagVariant | null>(null);
  const router = useRouter();

  const handleSelect = (tag: TagVariant) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] p-4">
      <div className="flex flex-col items-center flex-1 gap-5">
        <p className="text-center">
          태그를 선택하세요! 코스를 추천해 드려요 📌
        </p>
        {/* 태그 영역 */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-4">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleSelect(tag as TagVariant)}
              className={`
                cursor-pointer
                flex-1 min-w-[120px] max-w-[200px]
                h-[13vh] min-h-[85px] max-h-[160px]  // 화면 높이의 15%로 늘어나도록
                flex items-center justify-center
                rounded-lg
                border
                border-gray-300
                ${selectedTag === tag ? "bg-main-green text-white border-main-green" : "bg-white text-gray-800"}
                hover:bg-sub-green
                transition
                text-center
                font-medium
            `}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-3">
        <Button
          onClick={() => {
            router.push(`/course/recommend?tag=${selectedTag as TagVariant}`);
          }}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
};

export default Page;

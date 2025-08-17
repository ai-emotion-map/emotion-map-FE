"use client";

import React, { useState } from "react";
import NaverMap from "../components/navermap/NaverMap";
import Button from "../components/common/button/Button";
import { Search } from "lucide-react";
import LayerPopup from "../components/common/layerPopup/LayerPopup";
import { useRouter } from "next/navigation";
import { TagVariant } from "../components/common/tag/Tag";

const Page = () => {
  const markers = [
    { lat: 37.5665, lng: 126.978, emotion: "가족 🏠" as TagVariant },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 레이어팝업
  const router = useRouter();
  const handleSearch = () => {
    // 검색 로직 구현
    console.log(searchTerm);
  };
  const handleButtonClick = () => {
    // 버튼 클릭 시 /diary로 이동
    router.push("/write/diary");
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="relative flex flex-col items-center flex-1 gap-10">
        <div className="absolute flex items-center top-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="오늘의 이야기가 시작될 장소를 찾아보세요."
            className="focus:outline-none text-sm w-[320px] z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
          />
          <Search
            className="absolute z-10 text-base cursor-pointer right-3"
            color="#a6a6a6"
            size={18}
            onClick={handleSearch}
          />
        </div>
        <NaverMap markers={markers} zoom={12} height="500px" />
        {isOpen && (
          <LayerPopup
            open={isOpen}
            onOpenChange={setIsOpen}
            title="위치를 등록할까요?"
            description="이 위치를 오늘의 이야기 시작 장소로 등록합니다."
            onConfirm={handleButtonClick}
            type="cancelConfirm"
          />
        )}
      </div>
      <div className="mb-3">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          이야기 시작하기
        </Button>
      </div>
    </div>
  );
};

export default Page;

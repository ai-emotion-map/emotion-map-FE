"use client";

import React, { useState } from "react";
import NaverMap from "../components/navermap/NaverMap";
import Button from "../components/common/button/Button";
import { Search } from "lucide-react";
import LayerPopup from "../components/common/layerPopup/LayerPopup";
import { useRouter } from "next/navigation";
import { TagVariant } from "../components/common/tag/tag";

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
    if (markers.length > 0) {
      const { lat, lng, emotion } = markers[0];
      router.push(`/write/diary?lat=${lat}&lng=${lng}`);
    }
  };

  return (
    <div className="flex flex-col min-h-full gap-10">
      <div className="relative flex flex-col items-center flex-1 gap-10">
        <div className="absolute flex items-center justify-center w-[90%] top-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="오늘의 이야기가 시작될 장소를 찾아보세요."
            className="focus:outline-none text-sm w-full z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
          />
          <Search
            className="absolute z-10 text-base cursor-pointer right-3"
            color="#a6a6a6"
            size={18}
            onClick={handleSearch}
          />
        </div>
        <NaverMap markers={markers} zoom={12} height="60vh" />
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
      <div className="z-10 mb-3">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.back();
            }}
            className="w-1/3"
            color="gray"
          >
            작성 취소
          </Button>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="w-2/3"
          >
            이야기 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

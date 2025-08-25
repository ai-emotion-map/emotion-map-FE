"use client";

import React, { useState } from "react";
import { TAG_MAP, TagVariant } from "../../components/common/tag/tag.types";
import Button from "../../components/common/button/Button";
import { useRouter } from "next/navigation";
import Tag from "../../components/common/tag/Tag";
import NaverMap from "../../components/navermap/NaverMap";
import { MarkerDetail } from "@/app/components/BottomSheet";

export const DetailClient = ({
  markersData,
}: {
  markersData: MarkerDetail;
}) => {
  const [data] = useState<MarkerDetail>(markersData);
  const [selectedMarker] = useState<{
    lat: number;
    lng: number;
    emotion: TagVariant;
  } | null>({
    lat: data?.lat,
    lng: data?.lng,
    emotion: data?.tags[0] ? TAG_MAP[data?.tags[0]] : "기본",
  });

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const router = useRouter();

  function openNaverDirections(destinationName: string) {
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(
      destinationName
    )}`;
    window.open(url, "_blank");
  }

  const handleImageClick = (e: React.MouseEvent, image: string) => {
    e.stopPropagation();
    setZoomedImage(image);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="relative flex flex-col w-full min-h-[calc(100vh-150px)] p-4 bg-background">
      <div className="flex flex-col flex-1 gap-4">
        {/* 제목 */}
        <div>
          <h2 className="mb-1 text-lg font-bold">{data?.placeName}</h2>
          <h4 className="text-sm">{data?.roadAddress}</h4>
        </div>

        {/* 이미지 & 내용 */}
        <div className="flex flex-col gap-3">
          <div
            className={`flex gap-3 overflow-x-auto scrollbar-hide ${
              data?.imageUrls.length === 1 ? "justify-start" : ""
            }`}
          >
            {data?.imageUrls.map((image, index) => (
              <img
                key={index}
                src={`https://clustory.shop${image}`}
                alt={data?.placeName || "No Image"}
                className={`rounded-lg cursor-pointer transition-all duration-300 ${
                  data?.imageUrls.length === 1
                    ? "w-auto max-w-full object-contain"
                    : "w-[200px] flex-shrink-0 object-cover"
                }`}
                onClick={(e) => handleImageClick(e, image)}
              />
            ))}
          </div>
          <p>{data?.content}</p>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 py-1">
          {data.tags
            .map((tag) => TAG_MAP[tag as keyof typeof TAG_MAP])
            .filter(Boolean)
            .map((mappedTag) => (
              <Tag key={mappedTag} variant={mappedTag} type="default" />
            ))}
        </div>

        {/* 지도 & 버튼 */}
        <div className="flex-shrink-0 pointer-events-none">
          <NaverMap
            markers={selectedMarker ? [selectedMarker] : []}
            height="170px"
            options={{
              draggable: false,
              pinchZoom: false,
              scrollWheel: false,
              keyboardShortcuts: false,
              disableDoubleClickZoom: true,
            }}
            zoom={16}
          />
        </div>

        <div className="mb-3">
          <div className="z-20 flex gap-2">
            <Button onClick={() => router.back()} color="gray">
              닫기
            </Button>
            <Button
              onClick={() => {
                if (selectedMarker && data?.placeName) {
                  openNaverDirections(data?.placeName);
                }
              }}
            >
              장소 검색하기
            </Button>
          </div>
        </div>
      </div>

      {zoomedImage && (
        <div
          className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`https://clustory.shop${zoomedImage}`}
              alt={data?.placeName || "No Image"}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫히지 않도록
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-1 leading-none"
              onClick={handleCloseZoom}
              style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

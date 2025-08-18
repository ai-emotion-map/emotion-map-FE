import React from "react";
import Tag, { TagVariant } from "./common/tag/Tag";
import clsx from "clsx";
import NaverMap from "./navermap/NaverMap";
import Button from "./common/button/Button";
import { X } from "lucide-react";

const BottomSheet = ({
  isExpanded,
  setIsExpanded,
  selectedMarker,
  setIsOpen,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarker: {
    lat: number;
    lng: number;
    emotion: TagVariant;
  } | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const data = {
    title: "서울특별시청",
    address: "장소 주소",
    content:
      "장소에 대한 설명이나 리뷰가 여기에 들어갑니다. 장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    ],
    tags: ["가족 🏠", "우정 🤝", "위로/치유 🌱", "외로움 🌙"] as const,
  };

  function openNaverDirections(destinationName: string) {
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(destinationName)}`;
    window.open(url, "_blank");
  }

  return (
    <div
      className={`flex flex-col z-50 fixed left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-[430px] bg-background rounded-t-2xl border border-gray-200 transition-all duration-300 ease-in-out ${
        isExpanded ? "h-[100vh]" : "h-[40vh]"
      }`}
    >
      {/* 드래그 핸들 */}
      <div
        className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      ></div>

      <X
        className="absolute cursor-pointer top-12 right-6"
        color="#a6a6a6"
        onClick={() => setIsOpen(false)}
      />

      {/* 내용 */}
      <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto">
        <div>
          <h2 className="mb-1 text-lg font-bold">{data.title}</h2>
          <h4 className="text-sm">{data.address}</h4>
        </div>

        <div
          className={clsx(
            `flex items-start gap-3`,
            isExpanded ? "flex-col" : "flex-row"
          )}
        >
          {!isExpanded ? (
            <img
              src={data.images[0]}
              alt={data.title}
              className="rounded-lg w-[150px] h-28"
            />
          ) : (
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
          )}
          <p className={!isExpanded ? "h-28 overflow-hidden" : ""}>
            {data.content}
          </p>
        </div>

        <div
          className={clsx(
            "flex gap-2 py-1",
            isExpanded
              ? "flex-wrap"
              : "overflow-x-auto whitespace-nowrap scrollbar-hide"
          )}
        >
          {data.tags.map((tag) => (
            <Tag key={tag} variant={tag} />
          ))}
        </div>

        {isExpanded && (
          <>
            <div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;

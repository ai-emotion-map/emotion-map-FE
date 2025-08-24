"use client";

import React, { useState } from "react";
import NaverMap from "../components/navermap/NaverMap";
import Button from "../components/common/button/Button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { TagVariant } from "../components/common/tag/tag.types";
import LayerPopup from "../components/common/layerPopup/LayerPopup";
import { MarkerData } from "../components/navermap/naverMap.types";
import Input from "../components/common/input/Input";

interface NaverPlace {
  title: string;
  address: string;
  roadAddress?: string;
}

const Page = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([
    { lat: 37.611039, lng: 126.997257, emotion: "기본" },
  ]);
  const [center, setCenter] = useState({ lat: 37.611039, lng: 126.997257 });
  const [placeName, setPlaceName] = useState("");
  const [isLayerPopupOpen, setIsLayerPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<NaverPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [zoom, setZoom] = useState(13);

  const router = useRouter();

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search-place?keyword=${encodeURIComponent(searchTerm)}`
      );
      const data: NaverPlace[] = await res.json();
      setResults(data);
      setIsResultOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlace = (place: NaverPlace) => {
    if (!window.naver) return;

    const cleanTitle = place.title
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    setPlaceName(cleanTitle);
    setSearchTerm(cleanTitle);

    window.naver.maps.Service.geocode(
      { query: place.roadAddress || place.address },
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) return;

        const lat = parseFloat(response.v2.addresses[0].y);
        const lng = parseFloat(response.v2.addresses[0].x);

        setZoom(18);
        setCenter({ lat, lng });
        setMarkers([{ lat, lng, emotion: "기본" as TagVariant }]);
        setIsResultOpen(false);
      }
    );
  };

  return (
    <div className="flex flex-col min-h-full gap-10">
      <div className="relative flex flex-col items-center flex-1 gap-10">
        <div className="absolute flex items-center justify-center w-[90%] top-3">
          <Input
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            placeholder="오늘의 이야기가 시작될 장소를 찾아보세요."
          />
        </div>

        {isResultOpen && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] max-h-80 overflow-y-auto bg-background rounded-2xl shadow-lg p-4 z-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">검색 결과</h2>
              <button
                onClick={() => setIsResultOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                닫기 ✕
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-gray-500">검색 중...</p>
            ) : results.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {results.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-sub-green"
                    onClick={() => handleSelectPlace(place)}
                  >
                    <p className="font-semibold">
                      {place.title.replace(/<[^>]+>/g, "")}
                    </p>
                    <p className="text-sm text-gray-600">{place.address}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
            )}
          </div>
        )}

        {/* key로 강제 렌더링 */}
        <NaverMap
          key={`${center.lat}-${center.lng}`}
          markers={markers}
          center={center}
          zoom={zoom}
          options={{
            draggable: false, // 지도 드래그 금지
            pinchZoom: false, // 모바일 핀치 확대 금지
            scrollWheel: false, // 마우스 휠 확대 금지
            keyboardShortcuts: false,
            disableDoubleClickZoom: true,
          }}
          height="60vh"
        />
      </div>

      <div className="z-10 mb-3">
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/")}
            className="w-1/3"
            color="gray"
          >
            작성 취소
          </Button>
          <Button
            onClick={() => {
              if (placeName.length > 0) {
                const { lat, lng } = markers[0];
                router.push(
                  `/write/diary?place=${placeName}&lat=${lat}&lng=${lng}`
                );
              } else {
                setIsLayerPopupOpen(true);
              }
            }}
            className="w-2/3"
          >
            이야기 시작하기
          </Button>
        </div>
      </div>

      {placeName === "" && (
        <LayerPopup
          open={isLayerPopupOpen}
          onOpenChange={setIsLayerPopupOpen}
          title="장소 선택"
          description="장소가 선택되지 않았습니다."
          type="confirm"
        />
      )}
    </div>
  );
};

export default Page;

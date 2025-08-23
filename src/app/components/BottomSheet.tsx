import React, { useEffect } from "react";
import { BackendTag, TAG_MAP, TagVariant } from "./common/tag/tag.types";
import clsx from "clsx";
import NaverMap from "./navermap/NaverMap";
import Button from "./common/button/Button";
import { X } from "lucide-react";
import Tag from "./common/tag/Tag";
import { Api } from "../api/api";

export type MarkerDetail = {
  id: number;
  lat: number;
  lng: number;
  roadAddress: string;
  placeName: string | null;
  content: string;
  tags: BackendTag[];
  imageUrls: string[];
  createdAt: string; // ISO 8601 문자열
};

const BottomSheet = ({
  isExpanded,
  setIsExpanded,
  selectedMarker,
  setIsOpen,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarker: {
    id?: number;
    lat: number;
    lng: number;
    emotion: TagVariant;
  } | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = React.useState<MarkerDetail | null>(null);
  console.log(selectedMarker?.id);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        if (selectedMarker?.id) {
          const markersData = await Api.getPostById(selectedMarker?.id);
          console.log(markersData);
          setData(markersData);
        }
      } catch (err) {
        console.error("마커 불러오기 실패:", err);
      }
    };

    fetchMarkers();
  }, []);

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
          <h2 className="mb-1 text-lg font-bold">{data?.placeName}</h2>
          <h4 className="text-sm">{data?.roadAddress}</h4>
        </div>

        <div
          className={clsx(
            `flex items-start`,
            isExpanded ? "flex-col" : "flex-row",
            data?.imageUrls[0] ? "gap-3" : "gap-0"
          )}
        >
          {!isExpanded && data?.imageUrls[0] ? (
            <img
              src={data?.imageUrls[0]}
              alt={data?.placeName || "No Image"}
              className="rounded-lg w-[150px] h-28"
            />
          ) : (
            <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {data?.imageUrls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={data?.placeName || "No Image"}
                  className="w-full h-auto rounded-lg max-h-72"
                />
              ))}
            </div>
          )}
          <p className={!isExpanded ? "h-28 overflow-hidden" : ""}>
            {data?.content}
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
          {data?.tags.map((tag) => (
            <Tag key={tag} variant={TAG_MAP[tag]} />
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
                zoom={16}
              />
            </div>
            <div className="mb-3">
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
          </>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;

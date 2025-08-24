import React, { useEffect } from "react";
import { BackendTag, TAG_MAP, TagVariant } from "./common/tag/tag.types";
import clsx from "clsx";
import NaverMap from "./navermap/NaverMap";
import Button from "./common/button/Button";
import { X } from "lucide-react";
import Tag from "./common/tag/Tag";
import { Api } from "../api/api";
import { motion } from "framer-motion";
import Loading from "./common/Loading";

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
    <motion.div
      className="flex flex-col z-50 fixed left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-[430px] bg-background rounded-t-2xl border border-gray-200 overflow-hidden"
      animate={{ height: isExpanded ? "100vh" : "40vh" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
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

      {/* 로딩 처리 */}
      {!data ? (
        <div className="flex items-center justify-center flex-1">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto">
          {/* 기존 내용 */}
          <div>
            <h2 className="mb-1 text-lg font-bold">{data.placeName}</h2>
            <h4 className="text-sm">{data.roadAddress}</h4>
          </div>

          {/* 이미지/내용/태그 등 */}
          <div
            className={clsx(
              `flex items-start`,
              isExpanded ? "flex-col" : "flex-row",
              data.imageUrls[0] ? "gap-3" : "gap-0"
            )}
          >
            {!isExpanded && data.imageUrls[0] ? (
              <img
                src={`https://clustory.shop${data.imageUrls[0]}`}
                alt={data.placeName || "No Image"}
                className="rounded-lg w-[120px] h-32"
              />
            ) : (
              <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {data.imageUrls.map((image, index) => (
                  <img
                    key={index}
                    src={`https://clustory.shop${image}`}
                    alt={data.placeName || "No Image"}
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
                <Button
                  onClick={() => {
                    if (selectedMarker && data.placeName) {
                      openNaverDirections(data.placeName);
                    }
                  }}
                >
                  장소 검색하기
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default BottomSheet;

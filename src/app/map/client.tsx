"use client";

import React, { useState, useEffect } from "react";
import Tag from "../components/common/tag/Tag";
import {
  REVERSE_TAG_MAP,
  TAG_MAP,
  TagVariant,
} from "../components/common/tag/tag.types";
import NaverMap from "../components/navermap/NaverMap";
import { Search } from "lucide-react";
import BottomSheet from "../components/BottomSheet";
import { MarkerData } from "../components/navermap/naverMap.types";
import { Api, fetcher } from "../api/api";
import { Marker } from "../page";
import LayerPopup from "../components/common/layerPopup/LayerPopup";
import Input from "../components/common/input/Input";
import useSWR from "swr";


const MapClient = ({
  markers: initialMarkers,
}: {
  markers: (MarkerData & { id?: number })[];
}) => {
  const { data: markers } = useSWR("/posts/markers", fetcher, {
    fallbackData: initialMarkers,
  });

  const [mapMarkers, setMapMarkers] = useState<MarkerData[]>(markers);

  useEffect(() => {
    setMapMarkers(markers);
  }, [markers]);

  const tags = [
    "가족 🏠",
    "우정 🤝",
    "기쁨/신남 🎉",
    "위로/치유 🌱",
    "설렘/사랑 💌",
    "향수 🌿",
    "화남/분노 😡",
    "외로움 🌙",
  ] as const;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState<TagVariant[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<
    null | (MarkerData & { id?: number })
  >(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [center, setCenter] = useState({ lat: 37.611039, lng: 126.997257 });
  const [zoom, setZoom] = useState(12);

  const [isOpenLayerPopup, setIsOpenLayerPopup] = useState(false);

  // 검색어 입력
  const handleSearch = async () => {
    const markersData = await Api.searchPosts({
      q: searchTerm,
      tag: searchTag[0] ? REVERSE_TAG_MAP[searchTag[0]] : undefined,
    });

    if (!markersData.content || markersData.content.length === 0) {
      setIsOpenLayerPopup(true);
      return;
    }

    setCenter({
      lat: markersData.content[0].lat,
      lng: markersData.content[0].lng,
    });
    setZoom(12);

    const searchMarkers = markersData.content.map((marker: Marker) => ({
      id: marker.id,
      lat: marker.lat,
      lng: marker.lng,

      emotion: searchTag[0]
        ? searchTag[0]
        : ((TAG_MAP[marker.tags[0] as keyof typeof TAG_MAP] ||
            "기본") as TagVariant),
    }));

    setMapMarkers(searchMarkers);
  };

  // 태그 필터링
  const handleFilterByTag = async (tag: TagVariant | null) => {
    if (!tag) {
      // 태그가 없으면 전체 마커
      setMapMarkers(markers); // 초기 마커 상태로 복원
      setZoom(12);
      return;
    }

    const markersData = await Api.searchPosts({
      q: searchTerm,
      tag: REVERSE_TAG_MAP[tag],
    });

    if (!markersData.content || markersData.content.length === 0) {
      setIsOpenLayerPopup(true);
      setSearchTag([]);
      setSearchTerm("");
      setMapMarkers(markers); // 초기 마커 상태로 복원
      setZoom(12);
      return;
    }

    setCenter({
      lat: markersData.content[0].lat,
      lng: markersData.content[0].lng,
    });
    setZoom(12);

    const searchMarkers = markersData.content.map((marker: Marker) => ({
      id: marker.id,
      lat: marker.lat,
      lng: marker.lng,
      emotion: tag as TagVariant,
    }));

    setMapMarkers(searchMarkers);
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-150px)] gap-3 pt-2">
        {/* 검색창 */}
        <div className="relative flex items-center">
          <Input
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            placeholder="다양한 이야기를 검색해 보세요!"
          />
        </div>

        {/* 태그 */}
        <div className="flex gap-2 py-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant={tag}
              isActive={searchTag.includes(tag)}
              onClick={() => {
                if (searchTag.includes(tag)) {
                  setSearchTag([]);
                  handleFilterByTag(null);
                } else {
                  setSearchTag([tag]);
                  handleFilterByTag(tag);
                }
              }}
            />
          ))}
        </div>

        {/* 지도 */}
        <div className="relative flex-1">
          <NaverMap
            key={`${center.lat}-${center.lng}-${zoom}`}
            markers={mapMarkers}
            center={center}
            zoom={zoom}
            onMarkerClick={(marker) => {
              setSelectedMarker(marker);
              setIsExpanded(false); // 항상 처음은 반만 열림
              if (!isOpen) setIsOpen(true); // 열려있으면 그대로, 안 열려있으면 열기
            }}
            height="95%"
          />

          {/* ✅ 바텀시트 */}
          {isOpen && (
            <BottomSheet
              key={selectedMarker?.id}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              selectedMarker={selectedMarker}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>

      {isOpenLayerPopup && (
        <LayerPopup
          open={isOpenLayerPopup}
          onOpenChange={setIsOpenLayerPopup}
          title="검색 실패"
          description="검색 결과가 없습니다."
        />
      )}
    </>
  );
};

export default MapClient;

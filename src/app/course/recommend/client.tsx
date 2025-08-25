"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Api } from "@/app/api/api";
import NaverMap from "@/app/components/navermap/NaverMap";
import Loading from "@/app/components/common/Loading";
import {
  REVERSE_TAG_MAP,
  TAG_MAP,
  BackendTag,
  TagVariant,
} from "@/app/components/common/tag/tag.types";
import { RecommendedCourse, Stop } from "./recommend.types";
import { emotionImages } from "@/app/components/navermap/naverMap.types";

const RecommendCourseClient = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const [courseData, setCourseData] = useState<RecommendedCourse | null>(null);

  useEffect(() => {
    if (!tag) return;
    Api.recommendCourses({ emotion: REVERSE_TAG_MAP[tag as TagVariant] })
      .then(setCourseData)
      .catch(console.error);
  }, [tag]);

  const markers =
    courseData?.stops.map((stop: Stop) => ({
      lat: stop.lat,
      lng: stop.lng,
      emotion: TAG_MAP[courseData.emotion as BackendTag],
    })) || [];

  if (!courseData)
    return (
      <div className="h-[calc(100vh-150px)] flex flex-col items-center justify-center gap-3 pt-10 text-sm text-center text-gray-500">
        <p> 코스를 가져오는 중입니다.</p>

        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col items-center h-full gap-3">
      <div className="relative flex flex-col items-center w-full">
        {/* 도트선 */}
        <svg
          width="100%"
          height="10"
          className="absolute left-0 z-0 top-1/2"
          style={{ transform: "translateY(-50%)" }}
        >
          <line
            x1="0"
            y1="5"
            x2="100%"
            y2="5"
            stroke="#C0E5D3"
            strokeWidth="2"
            strokeDasharray="14,14"
            strokeLinecap="round"
          />
        </svg>
        {/* 태그 박스 */}
        <span className="text-white z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-main-green">
          {REVERSE_TAG_MAP[tag as TagVariant]} 코스 추천
          <img
            src={`${emotionImages[tag as TagVariant]}`}
            alt="코스 아이콘"
            width={25}
            height={25}
            className="inline-block align-middle"
          />
        </span>
      </div>
      <NaverMap
        markers={markers}
        zoom={14}
        height="35vh"
        polyline={courseData?.polyline}
        center={
          markers.length
            ? { lat: markers[0].lat, lng: markers[0].lng }
            : undefined
        }
      />
      <div className="flex flex-col w-full gap-2">
        {courseData.stops.map((stop, idx) => (
          <div
            key={idx}
            className="z-10 flex flex-col w-full p-4 border cursor-pointer border-main-green rounded-2xl hover:bg-sub-green"
            onClick={() => window.open(stop.kakaoUrl, "_blank")}
          >
            <span className="font-extralight font-onepick text-main-green">
              {idx + 1}
            </span>
            <span>{stop.placeName}</span>
            <p className="text-xs text-gray-500">{stop.roadAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendCourseClient;

"use client";

import { Api } from "@/app/api/api";
import {
  BackendTag,
  REVERSE_TAG_MAP,
  TAG_MAP,
  TagVariant,
} from "@/app/components/common/tag/tag.types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RecommendedCourse, Stop } from "./recommend.types";
import NaverMap from "@/app/components/navermap/NaverMap";
import Loading from "@/app/components/common/Loading";

const Page = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const [courseData, setCourseData] = useState<RecommendedCourse | null>(null);

  useEffect(() => {
    if (!tag) return;

    const fetchCourses = async () => {
      try {
        const data = await Api.recommendCourses({
          emotion: REVERSE_TAG_MAP[tag as TagVariant],
        });
        setCourseData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [tag]);

  const markers =
    courseData?.stops.map((stop: Stop) => ({
      lat: stop.lat,
      lng: stop.lng,
      emotion: TAG_MAP[courseData.emotion as BackendTag], // 전체 코스 감정으로 표시
    })) || [];

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] p-4 gap-4">
      {courseData ? (
        <div className="flex flex-col h-full gap-3">
          <NaverMap
            markers={markers}
            zoom={14}
            height="40vh"
            polyline={courseData?.polyline}
            center={
              markers.length
                ? { lat: markers[0].lat, lng: markers[0].lng }
                : undefined
            }
          />
          <div className="flex flex-col gap-2">
            {courseData?.stops.map((stop, idx) => (
              <div
                key={idx}
                className="z-10 flex flex-col w-full p-4 border cursor-pointer border-main-green rounded-2xl hover:bg-sub-green"
                onClick={() => {
                  window.open(stop.kakaoUrl, "_blank"); // 새 탭
                }}
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
      ) : (
        <div className="h-[calc(100vh-150px)] flex flex-col items-center justify-center gap-3">
          <p>♾️ 코스를 가져오는 중입니다 ♾️</p>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Page;

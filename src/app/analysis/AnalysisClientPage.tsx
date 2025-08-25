"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/common/button/Button";
import NaverMap from "../components/navermap/NaverMap";
import { MarkerData } from "../components/navermap/naverMap.types";
import { Tag } from "../components/common/tag/Tag";
import { TAG_MAP } from "../components/common/tag/tag.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Api } from "@/app/api/api"; // Import Api

const AnalysisClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const [tagTypes, setTagTypes] = useState<("cancel" | "add")[]>([
    "cancel",
    "cancel",
    "cancel",
  ]);
  const [marker, setMarker] = useState<MarkerData | null>(null);
  const [id, setId] = useState<number | null>(null);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const passed = sessionStorage.getItem("passed_diary") === "true";

    if (!passed) {
      router.replace("/not-found"); // 플래그 없으면 /not-found 이동
    } else {
      sessionStorage.removeItem("passed_diary"); // 뒤로가기 방지
      setChecking(false);
    }
  }, [router]);

  // tagTypes, tags가 바뀔 때마다 cancel 상태인 태그 중 첫 번째를 마커 emotion으로 사용
  useEffect(() => {
    if (!tags.length) {
      setMarker((prev) => (prev ? { ...prev, emotion: "기본" } : null));
      return;
    }
    const firstCancelIdx = tagTypes.findIndex((type) => type === "cancel");
    if (firstCancelIdx !== -1) {
      const markerEmotion =
        TAG_MAP[tags[firstCancelIdx] as keyof typeof TAG_MAP] || "기본";
      setMarker((prev) => (prev ? { ...prev, emotion: markerEmotion } : null));
    } else {
      setMarker((prev) => (prev ? { ...prev, emotion: "기본" } : null));
    }
  }, [tagTypes, tags]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const postId = parseInt(id, 10);
      Api.getPostById(postId)
        .then((data) => {
          if (data) {
            const tags = data.tags || [];
            setTags(tags.slice(0, 3));

            const firstTag = tags[0];
            // Map the raw tag to a TagVariant, provide a fallback
            const markerEmotion = firstTag
              ? TAG_MAP[firstTag as keyof typeof TAG_MAP]
              : "기본";

            setMarker({
              lat: data.lat,
              lng: data.lng,
              emotion: markerEmotion || "기본", // Ensure emotion is never undefined
            });
            setId(postId);
          }
        })
        .catch(console.error);
    }
  }, [searchParams]);

  if (checking) return null; // 검사 중에는 빈 화면

  const handleSave = () => {
    // cancel 상태인 태그만 newTags에 남김
    const newTags = tags.filter((_, idx) => tagTypes[idx] === "cancel");

    console.log(id, newTags); // id, 새 태그 배열 출력
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main content */}
      <div className="flex flex-col flex-grow pt-5 space-y-5">
        {/* Map placeholder replaced with NaverMap */}
        <NaverMap
          markers={marker ? [marker] : []}
          zoom={18}
          center={{
            lat: marker ? marker.lat : 37.611039,
            lng: marker ? marker.lng : 126.997257,
          }}
          options={{
            draggable: false, // 지도 드래그 금지
            pinchZoom: false, // 모바일 핀치 확대 금지
            scrollWheel: false, // 마우스 휠 확대 금지
            keyboardShortcuts: false,
            disableDoubleClickZoom: true,
          }}
          height="490px"
        />

        {/* Emotion tags */}
        <div className="flex justify-center pb-6 space-x-4">
          {tags.map((tag, index) => {
            const mappedTag = TAG_MAP[tag as keyof typeof TAG_MAP];
            const type = tagTypes[index] || "cancel";
            return (
              <Tag
                key={index}
                variant={mappedTag}
                type={type}
                onClick={() => {
                  setTagTypes((prev) => {
                    const next = [...prev];
                    next[index] = prev[index] === "cancel" ? "add" : "cancel";
                    return next;
                  });
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Save button */}
      <Button onClick={handleSave} className="mb-3">
        저장하기
      </Button>
    </div>
  );
};

export default AnalysisClientPage;

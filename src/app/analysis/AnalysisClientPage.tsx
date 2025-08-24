"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/common/button/Button";
import NaverMap from "../components/navermap/NaverMap";
import { MarkerData } from "../components/navermap/naverMap.types";
import { Tag } from "../components/common/tag/Tag";
import { TagVariant, TAG_MAP } from "../components/common/tag/tag.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Api } from "@/app/api/api"; // Import Api

const AnalysisClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const [marker, setMarker] = useState<MarkerData | null>(null);

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
          }
        })
        .catch(console.error);
    }
  }, [searchParams]);

  const handleSave = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main content */}
      <div className="flex flex-col flex-grow pt-5 space-y-5">
        {/* Map placeholder replaced with NaverMap */}
        <NaverMap markers={marker ? [marker] : []} height="490px" />

        {/* Emotion tags */}
        <div className="flex justify-center pb-6 space-x-4">
          {tags
            .map((tag) => TAG_MAP[tag as keyof typeof TAG_MAP])
            .filter(Boolean)
            .map((mappedTag, index) => (
              <Tag key={index} variant={mappedTag} type="default" />
            ))}
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

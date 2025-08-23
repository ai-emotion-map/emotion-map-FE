"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/common/button/Button";
import NaverMap from "../components/navermap/NaverMap";
import { MarkerData } from "../components/navermap/naverMap.types";
import { Tag } from "../components/common/tag/Tag";
import { TagVariant } from "../components/common/tag/tag.types";
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
          setTags(data.tags.slice(0, 3)); // Get first 3 tags
          setMarker({ lat: data.lat, lng: data.lng, emotion: data.tags[0] as TagVariant });
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
          {tags.map((tag, index) => (
            <Tag key={index} variant={tag as TagVariant} type="default" />
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

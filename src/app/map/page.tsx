// 서버 컴포넌트
import React from "react";
import { Api } from "../api/api";
import { TAG_MAP, TagVariant } from "../components/common/tag/tag.types";
import { Marker } from "../page";
import MapClient from "./client";

const Page = async () => {
  // 서버에서 마커 데이터 가져오기
  const markersData = await Api.getAllMarkers();

  const markers = markersData.map((marker: Marker) => ({
    lat: marker.lat,
    lng: marker.lng,
    emotion: (TAG_MAP[marker.tags[0] as keyof typeof TAG_MAP] ||
      "기본") as TagVariant,
  }));

  return <MapClient markers={markers} />;
};

export default Page;

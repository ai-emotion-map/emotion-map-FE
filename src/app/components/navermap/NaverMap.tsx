"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { TagVariant } from "../common/tag/Tag";

interface MarkerData {
  lat: number;
  lng: number;
  emotion: TagVariant;
}

interface NaverMapOptions {
  center?: naver.maps.LatLng;
  zoom?: number;
  draggable?: boolean;
  pinchZoom?: boolean;
  scrollWheel?: boolean;
  keyboardShortcuts?: boolean | Record<string, boolean>;
  disableDoubleClickZoom?: boolean;
}

interface NaverMapProps {
  markers: MarkerData[];
  zoom?: number;
  height?: string;
  onMarkerClick?: (marker: MarkerData) => void; // ✅ 마커 클릭 콜백 추가
  options?: NaverMapOptions;
}

// 감정별 마커 이미지
const emotionImages: Record<TagVariant, string> = {
  "가족 🏠": "/images/marker/yellow-marker.png",
  "우정 🤝": "/images/marker/blue-marker.png",
  "위로/치유 🌱": "/images/marker/green-marker.png",
  "외로움 🌙": "/images/marker/purple-marker.png",
  "설렘/사랑 💌": "/images/marker/pink-marker.png",
  "향수 🌿": "/images/marker/red-marker.png",
};

const NaverMap: React.FC<NaverMapProps> = ({
  markers,
  zoom = 10,
  height = "250px",
  onMarkerClick,
  options,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<naver.maps.Marker[]>([]);

  const initMap = () => {
    if (!window.naver || !mapRef.current) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: markers.length
        ? new window.naver.maps.LatLng(markers[0].lat, markers[0].lng)
        : new window.naver.maps.LatLng(37.5665, 126.978), // 기본 서울
      zoom,
      draggable: options?.draggable ?? true,
      pinchZoom: options?.pinchZoom ?? true,
      scrollWheel: options?.scrollWheel ?? true,
      keyboardShortcuts: options?.keyboardShortcuts ?? true,
      disableDoubleClickZoom: options?.disableDoubleClickZoom ?? false,
    });

    // 기존 마커 제거
    markerRefs.current.forEach((m) => m.setMap(null));
    markerRefs.current = [];

    // 각 마커 생성
    markers.forEach((markerData) => {
      const { lat, lng, emotion } = markerData;

      const img = new Image();
      img.onload = () => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map,
          icon: {
            url: emotionImages[emotion],
            size: new window.naver.maps.Size(40, 40),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(20, 40),
          },
        });

        // ✅ 마커 클릭 이벤트 등록
        window.naver.maps.Event.addListener(marker, "click", () => {
          if (onMarkerClick) onMarkerClick(markerData);
        });

        markerRefs.current.push(marker);
      };

      img.onerror = () => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map,
        });

        // ✅ 기본 마커에도 클릭 이벤트
        window.naver.maps.Event.addListener(marker, "click", () => {
          if (onMarkerClick) onMarkerClick(markerData);
        });

        markerRefs.current.push(marker);
      };

      img.src = emotionImages[emotion];
    });
  };

  useEffect(() => {
    if (window.naver) initMap();
  }, [markers, zoom, options]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div
        ref={mapRef}
        className="z-0 w-full overflow-hidden border rounded-3xl border-main-green"
        style={{ height }}
      />
    </>
  );
};

export default NaverMap;

import { TagVariant } from "../common/tag/tag.types";

export interface MarkerData {
  lat: number;
  lng: number;
  emotion: TagVariant;
}

export interface NaverMapOptions {
  center?: naver.maps.LatLng;
  zoom?: number;
  draggable?: boolean;
  pinchZoom?: boolean;
  scrollWheel?: boolean;
  keyboardShortcuts?: boolean | Record<string, boolean>;
  disableDoubleClickZoom?: boolean;
}

export interface NaverMapProps {
  markers: MarkerData[];
  zoom?: number;
  height?: string;
  onMarkerClick?: (marker: MarkerData) => void; // ✅ 마커 클릭 콜백 추가
  options?: NaverMapOptions;
}

// 감정별 마커 이미지
export const emotionImages: Record<TagVariant, string> = {
  "가족 🏠": "/images/marker/yellow-marker.svg",
  "우정 🤝": "/images/marker/blue-marker.svg",
  "위로/치유 🌱": "/images/marker/green-marker.svg",
  "외로움 🌙": "/images/marker/purple-marker.svg",
  "설렘/사랑 💌": "/images/marker/pink-marker.svg",
  "향수 🌿": "/images/marker/red-marker.svg",
  기본: "/images/marker/black-marker.svg",
};

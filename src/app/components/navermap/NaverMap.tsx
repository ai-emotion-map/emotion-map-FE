"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface NaverMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

const NaverMap: React.FC<NaverMapProps> = ({
  lat,
  lng,
  zoom = 10,
  height = "250px",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!window.naver || !mapRef.current) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
    });
  };

  // SDK가 이미 로드된 경우에도 실행되도록
  useEffect(() => {
    if (window.naver) {
      initMap();
    }
  }, [lat, lng, zoom]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div
        ref={mapRef}
        className="w-full overflow-hidden border rounded-3xl border-main-green"
        style={{ height: height }}
      ></div>
    </>
  );
};

export default NaverMap;

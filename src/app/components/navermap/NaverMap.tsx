"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { emotionImages, NaverMapProps } from "./naverMap.types";

interface LatLngArray extends Array<number> {
  0: number;
  1: number;
}

const NaverMap = ({
  markers,
  zoom = 10,
  height,
  onMarkerClick,
  options,
  center,
  polyline,
}: NaverMapProps & {
  center?: { lat: number; lng: number };
  polyline?: LatLngArray[];
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<naver.maps.Marker[]>([]);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const polylineInstance = useRef<naver.maps.Polyline | null>(null);

  const initMap = () => {
    if (!window.naver || !mapRef.current) return;

    const mapCenter = center
      ? new window.naver.maps.LatLng(center.lat, center.lng)
      : markers.length
        ? new window.naver.maps.LatLng(markers[0].lat, markers[0].lng)
        : new window.naver.maps.LatLng(37.6163, 127.0161); // 정릉동 기본 위치

    mapInstance.current = new window.naver.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom,
      ...options,
    });

    renderMarkers();
  };

  const renderMarkers = () => {
    if (!mapInstance.current) return;

    // 기존 마커 제거
    markerRefs.current.forEach((m) => m.setMap(null));
    markerRefs.current = [];

    // 기존 폴리라인 제거
    polylineInstance.current?.setMap(null);
    polylineInstance.current = null;

    // 마커 그리기
    markers.forEach((markerData) => {
      const { lat, lng, emotion } = markerData;
      const position = new window.naver.maps.LatLng(lat, lng);

      const marker = new window.naver.maps.Marker({
        position,
        map: mapInstance.current,
        icon: {
          url: emotionImages[emotion] || emotionImages["기본"],
          size: new window.naver.maps.Size(40, 40),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(20, 40),
        },
      });

      if (onMarkerClick) {
        window.naver.maps.Event.addListener(marker, "click", () =>
          onMarkerClick(markerData)
        );
      }

      markerRefs.current.push(marker);
    });

    // polyline prop이 있으면 그려주기
    if (polyline && polyline.length >= 2) {
      const linePath = polyline.map(
        ([lat, lng]) => new window.naver.maps.LatLng(lat, lng)
      );

      polylineInstance.current = new window.naver.maps.Polyline({
        map: mapInstance.current,
        path: linePath,
        strokeColor: "#6FCF97",
        strokeWeight: 4,
        strokeOpacity: 0.8,
      });
    }
  };

  // 마커, zoom, options 변경 시 렌더
  useEffect(() => {
    if (mapInstance.current) renderMarkers();
    else if (window.naver) initMap();
  }, [markers, zoom, options, polyline]);

  // center 변경 시 지도 이동
  useEffect(() => {
    if (mapInstance.current && center) {
      mapInstance.current.setCenter(
        new window.naver.maps.LatLng(center.lat, center.lng)
      );
      mapInstance.current.setZoom(zoom);
    }
  }, [center, zoom]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div
        ref={mapRef}
        className="z-0 flex-1 w-full overflow-hidden border rounded-3xl border-main-green"
        style={{ height }}
      />
    </>
  );
};

export default NaverMap;

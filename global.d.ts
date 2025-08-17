export {};

declare global {
  interface Window {
    naver: any;
  }
  namespace naver {
    namespace maps {
      type Marker = any;
      // 필요하면 Map, LatLng 등도 추가
    }
  }
}

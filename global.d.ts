export {};

declare global {
  interface Window {
    naver: {
      maps: typeof naver.maps;
    };
  }

  namespace naver {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options?: any);
        setCenter(latlng: LatLng): void;
        setZoom(zoom: number): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Marker {
        constructor(options?: any);
        setMap(map: Map | null): void;
      }

      class Point {
        constructor(x: number, y: number);
      }

      class Size {
        constructor(width: number, height: number);
        width: number;
        height: number;
      }

      class Icon {
        constructor(options: {
          url: string;
          size?: Size;
          origin?: Point;
          anchor?: Point;
        });
      }

      class MarkerImage {
        constructor(
          url: string,
          size?: Size,
          options?: { origin?: Point; anchor?: Point }
        );
      }

      class Polyline {
        constructor(options: {
          map?: Map;
          path: LatLng[];
          strokeColor?: string;
          strokeWeight?: number;
          strokeOpacity?: number;
          strokeStyle?: string;
        });
        setMap(map: Map | null): void;
      }

      namespace TransCoord {
        const TM: any;
        const WGS84: any;
        function fromTM(point: Point, from: any, to: any): LatLng;
      }

      const Event: any;

      class Service {
        static Status: {
          OK: string;
          ERROR: string;
        };
        static geocode(
          options: { query: string },
          callback: (
            status: (typeof Service.Status)[keyof typeof Service.Status],
            response: any
          ) => void
        ): void;
      }
    }
  }
}

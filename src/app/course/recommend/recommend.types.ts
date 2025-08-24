export type Stop = {
  placeId: string;
  placeName: string;
  roadAddress: string;
  lat: number;
  lng: number;
  tags: string[];
  content: string;
  kakaoUrl: string;
};

export type RecommendedCourse = {
  emotion: string;
  area: string;
  count: number;
  totalDistanceKm: number;
  estimatedWalkMinutes: number;
  polyline: [number, number][];
  stops: Stop[];
};

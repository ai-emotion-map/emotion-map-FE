import axios from "axios";

export const api = axios.create({
  baseURL: "https://clustory.shop",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000, // 10 초 경과시 에러 발생
});

/** 피드 카드 한 개 */
export type FeedPost = {
  id: number;
  lat: number; // 위도
  lng: number; // 경도
  roadAddress: string; // 도로명 주소
  placeName: string;
  thumbnailUrl: string | null; // 첫 이미지 url
  tags: string[]; // 태그 배열
  content: string;
  createdAt: string; // 작성 시각
};

export type Page<T> = {
  content: T[]; // 실제 피드 카드 목록
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 글 개수
  size: number; // 페이지당 크기
  number: number; // 현재 페이지 번호
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const getLatestPosts = async (page = 0, size = 20) => {
  const { data } = await api.get<Page<FeedPost>>("/posts/latest", {
    params: {page, size: Math.min(size, 100)},
  }
  );
  return data;
};

const API_BASE_URL = "https://clustory.shop";

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

// 피드 페이지 api
export const getLatestPosts = async (
  page = 0,
  size = 20
): Promise<Page<FeedPost>> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(Math.min(size, 100)),
  });
  const response = await fetch(
    `${API_BASE_URL}/posts/latest?${params.toString()}`,
    {
      cache: "no-store", // Added cache option
    }
  );

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  return response.json();
};

// 피드 검색용 api
export const searchPosts = async (
  q: string,
  page = 0,
  size = 20
): Promise<Page<FeedPost>> => {
  const params = new URLSearchParams({
    q,
    page: String(page),
    size: String(Math.min(size, 100)),
  });
  const response = await fetch(
    `${API_BASE_URL}/posts/search?${params.toString()}`,
    {
      cache: "no-store", // Added cache option
    }
  );

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  return response.json();
};

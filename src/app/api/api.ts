import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://clustory.shop";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// SWR fetcher 함수
export const fetcher = (url: string) =>
  api.get(`https://clustory.shop${url}`).then((res) => res.data);

// API 호출을 위한 함수들을 정의하는 객체
export const Api = {
  /**
   * 최신 게시물 목록을 가져옵니다.
   * @param page 페이지 번호 (기본값: 0)
   * @param size 한 페이지당 게시물 수 (기본값: 20, 최대: 100)
   * @returns 게시물 목록 데이터
   */
  getLatestPosts: async (page: number = 0, size: number = 20) => {
    // size는 최대 100으로 제한
    const actualSize = Math.min(size, 100);
    const response = await api.get("/post/latest", {
      params: {
        page,
        size: actualSize,
      },
    });
    return response.data;
  },

  /**
   * 새 게시물을 이미지와 함께 작성합니다.
   * @param payload 게시물 데이터 + 이미지 파일
   * @returns 작성 완료된 게시물 데이터
   */
  createPostWithImages: async (payload: {
    lat: number;
    lng: number;
    placeName: string;
    content: string;
    images: File[];
  }) => {
    const formData = new FormData();

    // 서버에서 요구하는 JSON 구조
    const postData = {
      placeName: payload.placeName,
      content: payload.content,
      lat: payload.lat,
      lng: payload.lng,
      roadAddress: "",
      emotions: "",
    };

    formData.append(
      "post",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );

    // 이미지 여러 장 추가
    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((image) => formData.append("images", image));
    }

    // POST 요청 (axios가 Content-Type 자동 설정)
    const response = await api.post("/posts/form", formData, {
      headers: { "Content-Type": undefined }, // axios가 FormData boundary를 자동 설정
    });

    return response.data;
  },

  /**
   * 전체 위치 조회 (마커)
   * @param minLat 최소 위도 (선택)
   * @param maxLat 최대 위도 (선택)
   * @param minLng 최소 경도 (선택)
   * @param maxLng 최대 경도 (선택)
   * @returns 마커 목록 [{ id, lat, lng, tags[] }]
   */
  getAllMarkers: async (params?: {
    minLat?: number;
    maxLat?: number;
    minLng?: number;
    maxLng?: number;
  }) => {
    const response = await api.get("/posts/markers", { params });
    return response.data; // [{ id, lat, lng, tags[] }]
  },

  /**
   * ID로 특정 게시물을 가져옵니다.
   * @param id 게시물 ID
   * @returns 게시물 데이터
   */
  getPostById: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  /**
   * 게시물 검색 (내용/주소, 태그, 지도 범위, 페이지네이션 지원)
   * @param params 검색 파라미터
   * @returns 게시물 목록 (페이지네이션 포함)
   */
  searchPosts: async (params: {
    q?: string; // 내용/주소 키워드
    tag?: string; // 특정 태그
    minLat?: number; // 지도 최소 위도
    maxLat?: number; // 지도 최대 위도
    minLng?: number; // 지도 최소 경도
    maxLng?: number; // 지도 최대 경도
    page?: number; // 페이지 번호 (0부터 시작)
    size?: number; // 페이지 크기 (기본 20, 최대 100)
  }) => {
    const { size = 20, ...rest } = params;
    const actualSize = Math.min(size, 100);

    const response = await api.get("/posts/search", {
      params: {
        ...rest,
        size: actualSize,
      },
    });
    return response.data; // { content: [...], page, size, totalElements, totalPages }
  },

  /**
   * 감정 기반 코스 추천
   * @param params 추천 파라미터
   * @returns 추천 코스 목록
   */
  recommendCourses: async (params: {
    emotion: string; // 선택한 감정 태그
  }) => {
    const response = await api.post("/courses/recommend", params);

    return response.data;
    // 예시: { content: [...], totalElements, totalPages, page, size }
  },

  /**
   * 게시글 태그 업데이트
   * @param params 게시글 ID와 태그 배열
   * @returns 업데이트된 태그 정보
   */
  updatePostTags: async (params: {
    id: number; // URL과 body에서 동일해야 함
    tags: string[]; // 업데이트할 태그 배열
  }) => {
    const { id, tags } = params;

    const response = await api.patch(`/posts/${id}/tags`, { id, tags });

    return response.data;
  },
};

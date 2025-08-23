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
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

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
    userId: number;
    lat: number;
    lng: number;
    placeName: string;
    content: string;
    images: File[];
    emotions: string[];
  }) => {
    const formData = new FormData();

    const { images, ...jsonData } = payload;

    // JSON 데이터를 한 덩어리로 append
    formData.append("post", JSON.stringify(jsonData));

    // 이미지 파일 append
    if (images && images.length > 0) {
      images.forEach((file) => formData.append("images", file));
    }

    const response = await api.post("/posts/form", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
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
};

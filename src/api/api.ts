import axios from 'axios';

// Axios 인스턴스 생성
// TODO: 실제 API 베이스 URL로 변경해주세요.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// SWR fetcher 함수
// SWR에서 데이터를 가져올 때 사용할 함수입니다.
export const fetcher = (url: string) => api.get(url).then(res => res.data);

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
    const response = await api.get('/post/latest', {
      params: {
        page,
        size: actualSize,
      },
    });
    return response.data;
  },

  // 여기에 다른 API 호출 함수들을 추가할 수 있습니다.
  // 예시:
  // getUserProfile: async (userId: string) => {
  //   const response = await api.get(`/users/${userId}`);
  //   return response.data;
  // },
};

// SWR과 함께 사용하는 예시 (client.tsx 등에서)
// import useSWR from 'swr';
// import { fetcher, Api } from '../api/api';

// function MyFeedComponent() {
//   const { data, error } = useSWR('/post/latest?page=0&size=20', fetcher);

//   if (error) return <div>데이터 로드 실패</div>;
//   if (!data) return <div>로딩 중...</div>;

//   return (
//     <div>
//       {data.map((post: any) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.roadAddress}</p>
//           {/* 기타 게시물 정보 표시 */}
//         </div>
//       ))}
//     </div>
//   );
// }

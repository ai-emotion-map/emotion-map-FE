import Image from "next/image";
import Review from "./components/common/Review";
import NaverMap from "./components/navermap/NaverMap";
import TagTicker from "./components/TagTicker";
import Weather from "./components/Weather";
import { TagVariant } from "./components/common/tag/tag.types";

export default function Home() {
  const reviews = [
    {
      id: 1,
      content:
        "감성 기반으로 장소를 찾을 수 있어서 너무 신기해요! 단순히 위치만 알려주는 게 아니라 그곳의 느낌까지 알 수 있어서 추억 여행하는 기분이에요.",
      name: "조OO",
      date: "2025년 8월 이용",
    },
    {
      id: 2,
      content:
        "정릉동에서의 클러스토리를 통해 제 감정을 더 잘 이해하게 되었어요. 이 앱 덕분에 제 기분을 표현하는 데 큰 도움이 되었습니다.",
      name: "김OO",
      date: "2025년 4월 이용",
    },
    {
      id: 3,
      content:
        "단순한 지도 앱이 아니라 감정과 기억을 엮어주니 마치 일기장 같아요. 덕분에 예전의 추억을 더 생생하게 떠올릴 수 있었어요.",
      name: "이OO",
      date: "2025년 7월 이용",
    },
    {
      id: 4,
      content:
        "평소에 잘 모르던 동네의 감정을 발견할 수 있어서 신선했어요. 나와 비슷한 기분을 느낀 사람들이 남긴 기록을 보는 게 재밌습니다.",
      name: "박OO",
      date: "2025년 6월 이용",
    },
    {
      id: 5,
      content:
        "기분이 우울할 때 가까운 위로의 공간을 추천받을 수 있어 정말 도움이 됐습니다. 마음이 차분해지는 경험이었어요.",
      name: "정OO",
      date: "2025년 5월 이용",
    },
    {
      id: 6,
      content:
        "단순한 장소 추천이 아니라 감정과 연결된 스토리를 알려줘서 더 의미 있었어요. 새로운 방식의 여행이라 특별했습니다.",
      name: "최OO",
      date: "2025년 3월 이용",
    },
  ];

  const markers = [
    { lat: 37.5665, lng: 126.978, emotion: "가족 🏠" as TagVariant },
    { lat: 37.5651, lng: 126.9895, emotion: "우정 🤝" as TagVariant },
    { lat: 37.57, lng: 126.982, emotion: "설렘/사랑 💌" as TagVariant },
    { lat: 37.561, lng: 126.975, emotion: "향수 🌿" as TagVariant },
  ];

  return (
    <main className="flex flex-col h-[calc(100vh-150px)] gap-5">
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex items-end justify-between px-1">
          <p className="text-base">오늘의 정릉동</p>
          <Weather />
        </div>

        <NaverMap markers={markers} zoom={13} />
      </div>

      <TagTicker />

      <div className="relative w-[calc(100%+2rem)] -mx-4 h-[200px] bg-main-green">
        {/* 제목 고정 */}
        <p className="absolute text-white top-4 left-6">
          Clustory 이용 후기 🌟
        </p>

        {/* 리뷰 스크롤 영역 */}
        <div className="flex items-end h-full gap-3 px-5 pb-5 overflow-x-auto scrollbar-hide ">
          {reviews.map((review) => (
            <Review
              key={review.id}
              content={review.content}
              name={review.name}
              date={review.date}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

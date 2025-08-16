import Review from "./components/common/Review";
import NaverMap from "./components/navermap/NaverMap";
import TagTicker from "./components/TagTicker";

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
    {
      id: 7,
      content:
        "친구와 함께 앱을 사용했는데, 서로의 감정을 공유하면서 대화가 깊어졌어요. 사람과 사람을 이어주는 따뜻한 서비스 같아요.",
      name: "한OO",
      date: "2025년 2월 이용",
    },
  ];

  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between px-3">
          <p className="text-base">오늘의 정릉동</p>
          <span className="px-2 py-1 text-sm text-white bg-main-green rounded-xl">
            ☀️맑음 / 26°C️
          </span>
        </div>
        <NaverMap lat={37.5665} lng={126.978} zoom={12} />
      </div>

      <TagTicker />

      <div className="w-[calc(100%+2rem)] -mx-4 h-[170px] bg-main-green flex items-center px-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 flex-nowrap">
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

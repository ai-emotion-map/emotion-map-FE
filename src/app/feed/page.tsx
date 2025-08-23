import { getLatestPosts } from "@/app/api/apiFeed";
import FeedClient from "./client";
import type { Card } from "./client";

const BASE_URL = "https://clustory.shop";

const colors = [
  "bg-feed-blue1",
  "bg-feed-green1",
  "bg-feed-blue2",
  "bg-feed-green2",
  "bg-feed-blue3",
  "bg-feed-green3",
];

export default async function Page() {
  const feedData = await getLatestPosts();

  const cards: Card[] = feedData.content.map((post) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const overlayOpacity = (Math.random() * 0.4 + 0.5).toFixed(2);

    return {
      id: post.id,
      color: randomColor,
      overlayOpacity: overlayOpacity,
      imageHeight: 200,
      imageUrl: post.thumbnailUrl
        ? `${BASE_URL}${post.thumbnailUrl}`
        : undefined,
      roadAddress: post.roadAddress,
      tags: post.tags,
    };
  });

  return <FeedClient cards={cards} />;
}

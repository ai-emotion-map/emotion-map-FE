import FeedClient from "./client";
import type { Card } from "./client";

export default function Page() {
  const cards: Card[] = Array.from({ length: 12 }).map((_, i) => {
    const overlayOpacity = (Math.random() * 0.4 + 0.5).toFixed(2);
    const imageHeight = Math.floor(Math.random() * (200 - 100 + 1) + 100); // Random height between 100 and 200
    const imageUrl = `https://picsum.photos/seed/\${i}/200/300`; // Placeholder image URL
    return {
      id: i,
      color: (() => {
        const colors = [
          "bg-feed-blue1",
          "bg-feed-green1",
          "bg-feed-blue2",
          "bg-feed-green2",
          "bg-feed-blue3",
          "bg-feed-green3",
        ];
        for (let i = colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors[i % colors.length];
      })(),
      overlayOpacity,
      imageHeight,
      imageUrl,
    };
  });

  return <FeedClient cards={cards} />;
}
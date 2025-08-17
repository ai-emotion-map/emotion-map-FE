import FeedClient from "./client";
import type { Card } from "./client";

export default function Page() {
  const presetHeights = [100, 130, 150, 180, 200];

  const cards: Card[] = Array.from({ length: 12 }).map((_, i) => {
    const overlayOpacity = (Math.random() * 0.2 + 0.7).toFixed(2);
        const imageHeight = presetHeights[Math.floor(Math.random() * presetHeights.length)]/2;  
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
    };
  });

  return <FeedClient cards={cards} />;
}
import FeedClient from "./client";
import type { Card } from "./client";

export default function Page() {
  const cards: Card[] = Array.from({ length: 12 }).map((_, i) => {
    const overlayOpacity = (Math.random() * 0.5 + 0.3).toFixed(2);
    return {
      id: i,
      color: [
        "bg-marker-yellow",
        "bg-marker-blue",
        "bg-marker-orange",
        "bg-marker-purple",
        "bg-marker-pink",
        "bg-marker-green"
      ][i % 6],
      overlayOpacity,
    };
  });

  return <FeedClient cards={cards} />;
}

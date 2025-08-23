import FeedClient from "./client";
import { getCards } from "./actions";

export default async function Page() {
  const { cards: initialCards } = await getCards(0, 20);
  return <FeedClient initialCards={initialCards} />;
}

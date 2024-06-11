import { get } from "./axios";

const BACK_END_URL = "http://localhost:3333/flashcards";

export async function apiGetAllFlashCards() {
  const allFlashCards = await get(BACK_END_URL);

  return allFlashCards;
}

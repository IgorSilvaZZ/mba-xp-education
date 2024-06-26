import { read, create, edit, exclude } from "./axios";
import { getNewId } from "./idService";

export async function apiGetAllFlashCards() {
  const allFlashCards = await read("/flashcards");

  return allFlashCards;
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = await create("/flashcards", {
    id: getNewId(),
    title,
    description,
  });

  return newFlashCard;
}

export async function apiUpdateFlashCard(cardId, title, description) {
  const updatedFlashCard = await edit(`/flashcards/${cardId}`, {
    title,
    description,
  });

  return updatedFlashCard;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

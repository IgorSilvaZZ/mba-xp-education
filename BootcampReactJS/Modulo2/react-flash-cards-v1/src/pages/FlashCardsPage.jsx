import { FlashCard } from "../components/FlashCard";
import { Header } from "../components/Header";
import { Main } from "../components/Main";

import { allFlashCards } from "../data/allFlashCards";

export default function FlashCardsPage() {
  return (
    <>
      <Header>React Flash Cards V1</Header>
      <Main>
        <FlashCard />
        <FlashCard title='React' description='Biblioteca Front End' />
      </Main>
    </>
  );
}

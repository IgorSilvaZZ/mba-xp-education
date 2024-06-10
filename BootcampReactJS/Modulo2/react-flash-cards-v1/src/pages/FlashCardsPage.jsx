import { useState } from "react";
import { Button } from "../components/Button";
import { FlashCard } from "../components/FlashCard";
import { FlashCards } from "../components/FlashCards";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { RadioButton } from "../components/RadioButton";

import { allFlashCards } from "../data/allFlashCards";
import { helperShuffleArray } from "../helpers/arrayHelpers";

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showTitles, setShowTitles] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);

    setAllCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...allCards].map((card) => ({
      ...card,
      showTitle: true,
    }));

    setAllCards(updatedCards);

    setShowTitles(true);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...allCards].map((card) => ({
      ...card,
      showTitle: false,
    }));

    setAllCards(updatedCards);

    setShowTitles(false);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...allCards];

    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);

    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setAllCards(updatedCards);
  }

  return (
    <>
      <Header>React Flash Cards V1</Header>
      <Main>
        <div className='text-center mb-4'>
          <Button onButtonClick={handleButtonClick}>Embaralhar Cards</Button>
        </div>

        <div className='flex item-center justify-center space-x-4 m-4'>
          <RadioButton
            id='radioButtonShowTitle'
            name='showInfo'
            buttonChecked={showTitles}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar Titulo
          </RadioButton>
          <RadioButton
            id='radioButtonShowDescription'
            name='showInfo'
            buttonChecked={!showTitles}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar Descrição
          </RadioButton>
        </div>

        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => (
            <FlashCard
              key={id}
              id={id}
              title={title}
              description={description}
              showFlashCardTitle={showTitle}
              onToggleFlashCard={handleToggleFlashCard}
            />
          ))}
        </FlashCards>
      </Main>
    </>
  );
}

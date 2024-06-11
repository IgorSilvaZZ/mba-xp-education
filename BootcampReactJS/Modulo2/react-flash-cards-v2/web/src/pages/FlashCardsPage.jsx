import { useState, useEffect } from "react";

import { Button } from "../components/Button";
import { FlashCard } from "../components/FlashCard";
import { FlashCards } from "../components/FlashCards";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { RadioButton } from "../components/RadioButton";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import { apiGetAllFlashCards } from "../lib/api";

export default function FlashCardsPage() {
  // Back-End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [showTitles, setShowTitles] = useState(true);

  const [loading, setLoading] = useState(true);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);

    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: true,
    }));

    setStudyCards(updatedCards);

    setShowTitles(true);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: false,
    }));

    setStudyCards(updatedCards);

    setShowTitles(false);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];

    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);

    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  useEffect(() => {
    /* apiGetAllFlashCards()
      .then((allFlashCards) => {
        setAllCards(allFlashCards);
      })
      .catch((error) => {
        console.log(error);
      }); */

    /* async function getAllCards() {
      const resultAllCards = await apiGetAllFlashCards();

      setAllCards(resultAllCards);
    }
      
    getAllCards();
      
    */

    (async () => {
      const resultAllCards = await apiGetAllFlashCards();

      setLoading(false);
      setAllCards(resultAllCards);
    })();
  }, []);

  return (
    <>
      <Header>React Flash Cards V1</Header>
      <Main>
        <div className='text-center mb-4'>
          <Button onButtonClick={handleShuffle}>Embaralhar Cards</Button>
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
          {studyCards.map(({ id, title, description, showTitle }) => (
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

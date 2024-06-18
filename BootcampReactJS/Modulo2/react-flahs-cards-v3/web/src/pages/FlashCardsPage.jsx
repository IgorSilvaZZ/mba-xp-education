import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Button } from "../components/Button";
import { FlashCard } from "../components/FlashCard";
import { FlashCards } from "../components/FlashCards";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { RadioButton } from "../components/RadioButton";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { FlashCardItem } from "../components/FlashCardItem";
import { FlashCardForm } from "../components/FlashCardForm";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import {
  apiDeleteFlashCard,
  apiCreateFlashCard,
  apiGetAllFlashCards,
  apiUpdateFlashCard,
} from "../lib/api";

export default function FlashCardsPage() {
  // Back-End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [showTitles, setShowTitles] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

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

  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  async function handleDeleteFlashCard(flashCardId) {
    try {
      await apiDeleteFlashCard(flashCardId);

      // Front-End
      setAllCards(allCards.filter((card) => card.id !== flashCardId));

      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleTabSelected(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        const newFlashCard = await apiCreateFlashCard(title, description);

        // Front-End
        setAllCards([...allCards, newFlashCard]);

        setError("");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await apiUpdateFlashCard(selectedFlashCard.id, title, description);

        // Front-End
        setAllCards(
          allCards.map((card) => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }

            return card;
          })
        );

        setSelectedFlashCard(null);
        setCreateMode(true);

        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  useEffect(() => {
    (async () => {
      try {
        const resultAllCards = await apiGetAllFlashCards();

        setAllCards(resultAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  let mainJsx = (
    <div className='flex justify-center my-4'>
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelected}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map((flashCard) => (
              <FlashCardItem
                key={flashCard.id}
                onEdit={handleEditFlashCard}
                onDelete={handleDeleteFlashCard}
              >
                {flashCard}
              </FlashCardItem>
            ))}
          </TabPanel>

          <TabPanel>
            <div className='my-4'>
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>React Flash Cards V3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}

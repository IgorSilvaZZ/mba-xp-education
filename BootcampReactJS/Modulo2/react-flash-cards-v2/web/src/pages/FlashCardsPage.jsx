import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Button } from "../components/Button";
import { FlashCard } from "../components/FlashCard";
import { FlashCards } from "../components/FlashCards";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { RadioButton } from "../components/RadioButton";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import { apiGetAllFlashCards } from "../lib/api";
import { FlashCardItem } from "../components/FlashCardItem";
import { FlashCardForm } from "../components/FlashCardForm";

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

  function handleDeleteFlashCard(flashCardId) {
    setAllCards(allCards.filter((card) => card.id !== flashCardId));
  }

  function handleTabSelected(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
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

  if (!loading) {
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
            <FlashCardForm createMode={createMode} />
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
      <Header>React Flash Cards V1</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}

/* import { useEffect, useState } from "react"; */

export const FlashCard = ({
  id = "Id do Card",
  title = "Titulo de Card",
  description = "Descrição do Card, que pode conter mais palavras que o titulo",
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) => {
  /* const [showTitle, setShowTitle] = useState(showFlashCardTitle); */

  /* const fontSizeClassName = showTitle ? "text-xl" : "text-sm"; */
  const fontSizeClassName = showFlashCardTitle ? "text-xl" : "text-sm";

  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }

    /* setShowTitle((currentShowTitle) => !currentShowTitle); */
  }

  /* useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]); */

  return (
    <>
      <div
        className={`${fontSizeClassName} shadow-lg p-4 m-2 w-80 h-32 flex items-center justify-center font-semibold cursor-pointer`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={handleCardClick}
      >
        {showFlashCardTitle ? title : description}
      </div>
    </>
  );
};

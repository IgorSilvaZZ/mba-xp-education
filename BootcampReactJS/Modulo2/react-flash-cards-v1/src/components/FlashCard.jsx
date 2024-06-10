import { useState } from "react";

export const FlashCard = ({
  title = "Titulo de Card",
  description = "Descrição do Card, que pode conter mais palavras que o titulo",
}) => {
  const [showTitle, setShowTitle] = useState(true);

  const fontSizeClassName = showTitle ? "text-xl" : "text-md";

  function handleCardClick() {
    setShowTitle((currentShowTitle) => !currentShowTitle);
  }

  return (
    <>
      <div
        className={`${fontSizeClassName} shadow-lg p-4 w-64 h-32 flex items-center justify-center font-semibold cursor-pointer`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={handleCardClick}
      >
        {showTitle ? title : description}
      </div>
    </>
  );
};

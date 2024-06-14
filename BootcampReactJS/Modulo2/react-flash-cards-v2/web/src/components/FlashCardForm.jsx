import { useState } from "react";

import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";

export const FlashCardForm = ({ createMode = true }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  return (
    <form className={`${backgroundClassName} p-4`}>
      <h2 className='text-center font-semibold'>Manutenção de Flash Cards</h2>

      <TextInput
        labelDescription='Titulo'
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription='Descrição'
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />
    </form>
  );
};

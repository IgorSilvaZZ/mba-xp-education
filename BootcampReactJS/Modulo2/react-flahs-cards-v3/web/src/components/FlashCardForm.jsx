import { useState, useEffect } from "react";

import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { Error } from "./Error";

export const FlashCardForm = ({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) => {
  const [title, setTitle] = useState(flashCard?.title || "");
  const [description, setDescription] = useState(flashCard?.description || "");
  const [error, setError] = useState("");

  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    setTitle("");
    setDescription("");
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError("");

      if (onPersist) {
        onPersist(title, description);

        clearFields();
      }
    } else {
      setError("Titulo e Descrição são obrigatórios.");
    }
  }

  function validateForm() {
    return title.trim() !== "" && description.trim() !== "";
  }

  function handleFormReset() {
    clearFields();
  }

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
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

      <div className='flex items-center justify-between'>
        {error.trim() !== "" ? <Error>{error}</Error> : <span>&nbsp;</span>}
        <div>
          <Button color='bg-red-200' type='reset'>
            Limpar
          </Button>
          <Button color='bg-green-300' type='submit'>
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};

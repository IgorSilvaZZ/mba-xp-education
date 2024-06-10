import { getNewId } from "../lib/idService";

export const RadioButton = ({
  id = getNewId(),
  name = "radioButtonName",
  buttonChecked = false,
  onButtonClick = null,
  children: buttonDescription = "Descrição do Botão",
}) => {
  function handleRadioButtonChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='radio'
        id={id}
        name={name}
        checked={buttonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{buttonDescription}</label>
    </div>
  );
};

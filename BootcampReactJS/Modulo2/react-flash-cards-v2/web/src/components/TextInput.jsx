import { getNewId } from "../lib/idService";

export function TextInput({
  id = getNewId(),
  labelDescription = "Descrição do label",
  inputValue = "Valor Padrão do input",
  onInputChange = null,
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      onInputChange(currentTarget.value);
    }
  }

  return (
    <>
      <div className='flex flex-col my-4'>
        <label htmlFor='inputName' className='text-sm mb-1'>
          {labelDescription}
        </label>
        <input
          autoFocus={autoFocus}
          id={id}
          className='border p-1'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

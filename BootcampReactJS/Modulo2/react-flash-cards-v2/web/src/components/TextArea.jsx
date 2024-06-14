import { getNewId } from "../lib/idService";

export function TextArea({
  id = getNewId(),
  labelDescription = "Descrição do label",
  textAreaValue = "Valor padrão do textarea",
  onTextAreaChange = null,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      onTextAreaChange(currentTarget.value);
    }
  }

  return (
    <>
      <div className='flex flex-col my-4'>
        <label htmlFor='inputName' className='text-sm mb-1'>
          {labelDescription}
        </label>
        <textarea
          id={id}
          className='border p-1'
          type='text'
          maxLength={maxLength}
          rows={rows}
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />
      </div>
    </>
  );
}

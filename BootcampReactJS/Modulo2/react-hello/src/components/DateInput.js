export function DateInput({
  id = "id_do_input_date",
  labelDescription = "Descrição do label",
  inputValue = "2021-04-30",
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
          type='date'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

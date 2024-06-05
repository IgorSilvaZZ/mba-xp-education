export function CheckboxInput({
  id = "id_do_checkbox",
  labelDescription = "Descrição do checkbox",
  onCheckboxChange = null,
  autoFocus = false,
}) {
  function handleCheckBoxInput() {
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  }

  return (
    <>
      <div className='flex flex-row items-center space-x-2 my-4'>
        <input
          autoFocus={autoFocus}
          id={id}
          className='border p-1'
          type='checkbox'
          onChange={handleCheckBoxInput}
        />
        <label htmlFor='inputName' className='text-sm mb-1'>
          {labelDescription}
        </label>
      </div>
    </>
  );
}

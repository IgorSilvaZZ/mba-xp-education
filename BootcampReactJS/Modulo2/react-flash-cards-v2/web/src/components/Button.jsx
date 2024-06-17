export const Button = ({
  children: description = "Descrição do Botão",
  color = "bg-gray-200",
  type = "button",
  onButtonClick = null,
}) => {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <>
      <button
        type={type}
        className={`${color} p-2 m-1 rounded-md`}
        onClick={handleButtonClick}
      >
        {description}
      </button>
    </>
  );
};

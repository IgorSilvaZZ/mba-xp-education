import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";

export const FlashCardItem = ({
  children: flashCard,
  onEdit = null,
  onDelete = null,
}) => {
  const { title, description } = flashCard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }

  return (
    <>
      <ul className='flex flex-col space-y-4'>
        <li>
          <strong>Título:</strong>
          <span>{title}</span>
        </li>
        <li>
          <strong>Descrição:</strong>
          <span>{description}</span>
        </li>
      </ul>

      <div className='mt-4 flex items-center justify-end space-y-4'>
        <EditIcon className='cursor-pointer' size={24} />
        <DeleteIcon
          onClick={handleDeleteIconClick}
          className='cursor-pointer'
          size={24}
        />
      </div>
    </>
  );
};

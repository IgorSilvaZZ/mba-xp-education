/* eslint-disable react/prop-types */

export const CardsInfos = ({ children: cardsInfos }) => {
  return (
    <div className='flex flex-col justify-evenly w-1/3 h-[300px] max-h-[500px]'>
      {cardsInfos}
    </div>
  );
};

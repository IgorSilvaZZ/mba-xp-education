import { CardInfo } from "./CardInfo";

export const CardsInfos = () => {
  return (
    <div className='flex flex-col justify-evenly w-1/3'>
      <div className='w-full flex gap-2'>
        <CardInfo />
        <CardInfo />
      </div>
      <div className='w-full flex gap-2'>
        <CardInfo />
        <CardInfo />
      </div>
    </div>
  );
};

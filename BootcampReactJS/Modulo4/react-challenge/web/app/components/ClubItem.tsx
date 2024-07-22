import Image from "next/image";

import { IParticipantInfoMatch } from "../interfaces/IParticipantInfoMatch";

interface ClubItemProps {
  position: number;
  matcherItem: IParticipantInfoMatch;
}

export const ClubItem = ({ position, matcherItem }: ClubItemProps) => {
  const nameImageMatcher = matcherItem.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(" ")
    .join("_");

  return (
    <>
      <div className='w-full h-16 my-3 flex flex-items bg-white rounded shadow-md'>
        <div className='flex items-center gap-5 w-28 px-3'>
          <span className='rounded-full font-semibold text-gray-600'>
            {position}
          </span>
          <Image
            src={`/${nameImageMatcher}.png`}
            width={35}
            height={35}
            alt='Club Image'
          />
        </div>
        <div className='flex items-center px-5 w-[500px]'>
          <span className='font-bold'>{matcherItem.name}</span>
        </div>
        <div className='flex flex-1 items-center'>
          <span className='w-20 text-center'>{matcherItem.totalPoints}</span>
          <span className='w-20 text-center'>{matcherItem.totalVictories}</span>
          <span className='w-20 text-center'>{matcherItem.totalDraw}</span>
          <span className='w-20 text-center'>{matcherItem.totalDefeats}</span>
          <span className='w-20 text-center'>{matcherItem.goalsScored}</span>
          <span className='w-20 text-center'>{matcherItem.goalsConceded}</span>
          <span className='w-20 text-center'>{matcherItem.balanceGoals}</span>
        </div>
      </div>
    </>
  );
};

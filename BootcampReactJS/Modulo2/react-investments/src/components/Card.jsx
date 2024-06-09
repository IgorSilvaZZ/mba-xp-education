/* eslint-disable react/prop-types */

import bitcoinIcon from "../assets/bitcoin.png";

export const Card = ({
  id,
  description,
  totalPerformance,
  totalPercent,
  handleFoundSelected,
}) => {
  const colorPerformance =
    totalPerformance < 0 ? "text-red-600" : "text-green-600";

  return (
    <div
      className='flex flex-col gap-3 h-full w-40 bg-zinc-800 rounded-xl leading-tight justify-center items-center flex-content-scroll cursor-pointer transition-colors hover:bg-zinc-600'
      onClick={() => handleFoundSelected(id)}
    >
      <img src={bitcoinIcon} className='w-10' />
      <span className='text-gray-500 font-semibold text-xs text-center w-full'>
        {description}
      </span>
      <p className={`${colorPerformance} font-bold text-2xl`}>
        {Number(totalPerformance).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p className={`${colorPerformance} font-semibold text-sm`}>
        ({Number(totalPercent).toFixed(2)}%)
      </p>
    </div>
  );
};

/* eslint-disable react/prop-types */

import { formattedNumber } from "../utils/formattedNumber";

export const CardInfo = ({ value = 0, description = "Descrição do valor" }) => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center rounded-lg w-52 h-28 shadow-lg bg-zinc-800'>
      <span className='text-white font-bold text-xl'>
        {formattedNumber(value)}
      </span>
      <p className='font-semibold text-gray-400 text-sm'>{description}</p>
    </div>
  );
};

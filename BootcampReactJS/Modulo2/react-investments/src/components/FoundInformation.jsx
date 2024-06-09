/* eslint-disable react/prop-types */
import { InfoCard } from "./InfoCard";

export const FoundInformation = ({ foundSelected }) => {
  return (
    <div className='flex flex-col gap-4 m-2'>
      <span className='text-base text-gray-600 font-semibold'>
        {foundSelected.description}
      </span>
      <div className='flex flex-col gap-4 h-[480px] max-w-[500px] overflow-y-auto'>
        {foundSelected.reports.map(({ id, month, value, percent }) => (
          <InfoCard
            key={id}
            numberMonth={month}
            value={value}
            percentMonth={percent ?? 0}
          />
        ))}
      </div>
    </div>
  );
};

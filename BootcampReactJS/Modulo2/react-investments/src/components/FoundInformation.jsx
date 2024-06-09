import { InfoCard } from "./InfoCard";

export const FoundInformation = () => {
  return (
    <div className='flex flex-col gap-4 m-2'>
      <span className='text-base text-gray-600 font-semibold'>
        Fundo de Ações
      </span>
      <div className='flex flex-col gap-4 h-[480px] max-w-[500px] overflow-y-auto'>
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
};

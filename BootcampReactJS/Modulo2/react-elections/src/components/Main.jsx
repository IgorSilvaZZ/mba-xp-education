import { CardsInfos } from "./CardsInfos";

export const Main = () => {
  return (
    <div className='w-full flex flex-col flex-1 px-10 gap-10 leading-tight'>
      <div className='w-1/2 flex flex-col gap-3'>
        <span className='text-2xl text-white'>NFKey Governance</span>
        <p className='text-base text-gray-500'>
          You can vote on each proposal yourself or delegate your votes to a
          third party.
        </p>
      </div>

      <div className='flex w-full items-center justify-between'>
        <span className='text-xl text-white font-semibold'>Proposals</span>

        <select className='bg-transparent p-3 text-white text-sm w-56 rounded-xl border border-white outline-none'>
          <option value='all'>Selecione um Estado</option>
        </select>
      </div>

      <div className='flex gap-10 w-full flex-1'>
        <CardsInfos />
      </div>
    </div>
  );
};

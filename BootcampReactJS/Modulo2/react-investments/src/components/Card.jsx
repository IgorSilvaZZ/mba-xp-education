import bitcoinIcon from "../assets/bitcoin.png";

export const Card = () => {
  return (
    <div className='flex flex-col gap-3 h-full w-40 bg-zinc-800 rounded-xl leading-tight justify-center items-center flex-content-scroll cursor-pointer'>
      <img src={bitcoinIcon} className='w-10' />
      <span className='text-gray-500 font-light'>Fundo de Ações</span>
      <p className='text-white font-bold text-3xl'>614,54</p>
    </div>
  );
};

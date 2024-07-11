import Image from "next/image";

export const CardExchange = () => {
  return (
    <>
      <div className='h-20 w-[1000px] p-2 flex items-center justify-around gap-3 rounded-xl bg-zinc-900 text-white mt-2'>
        <div className='w-9 h-9 flex items-center justify-center rounded-full'>
          <Image
            src={`https://coin-images.coingecko.com/markets/images/52/small/binance.jpg?1706864274`}
            alt='Exchange Image'
            width={40}
            height={40}
          />
        </div>
        <div className='flex flex-col items-center w-24 text-ellipsis overflow-hidden text-center'>
          <span className='font-bold'>Vol. Trade (24H)</span>
          <span className='font-semibold'>
            {parseFloat(String(189213.39913144175)).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className='w-24 text-center'>
          <span className='font-bold'>Pais</span>
          <span className='font-semibold'>Cayman Islands</span>
        </div>
        <div className='w-24 text-center'>
          <span className='font-bold'>Pontuação</span>
          <span className='font-bold'>10</span>
        </div>
        <div className='w-24 text-center'>
          <span className='font-bold'>Ano Criação</span>
          <span className='font-bold'>2017</span>
        </div>
      </div>
    </>
  );
};

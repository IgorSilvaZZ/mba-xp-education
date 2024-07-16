import Image from "next/image";

import { IExchange } from "../interfaces/Exchange.interface";
interface CardExchangeProps {
  exchangeItem: IExchange;
}

export const CardExchange = ({ exchangeItem }: CardExchangeProps) => {
  return (
    <>
      <div className='w-[1000px] p-2 flex items-center justify-around gap-3 rounded-xl bg-zinc-900 text-white mt-2'>
        <div className='w-9 h-9 flex items-center justify-center rounded-full'>
          <Image
            src={exchangeItem?.image}
            alt='Exchange Image'
            width={40}
            height={40}
          />
        </div>
        <div className='w-24 flex flex-col items-center text-ellipsis overflow-hidden text-center'>
          <span className='font-bold text-xs text-violet-600'>
            Vol. Trade (24H)
          </span>
          <span className='font-semibold text-xs'>
            {parseFloat(
              String(exchangeItem.trade_volume_24h_btc)
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className='w-24 flex flex-col text-center'>
          <span className='font-bold text-xs text-violet-600'>Pais</span>
          <span className='font-semibold text-xs'>{exchangeItem.country}</span>
        </div>
        <div className='w-24 flex flex-col text-center'>
          <span className='font-bold text-xs text-violet-600'>Pontuação</span>
          <span className='font-semibold text-xs'>
            {exchangeItem.trust_score}
          </span>
        </div>
        <div className='w-24 flex flex-col text-center'>
          <span className='font-bold text-xs text-violet-600'>Ano Criação</span>
          <span className='font-semibold text-xs'>
            {exchangeItem.year_established}
          </span>
        </div>
      </div>
    </>
  );
};

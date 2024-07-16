"use client";

import { useState } from "react";
import useSWR from "swr";

import { IExchange } from "../interfaces/Exchange.interface";
import { Header } from "./Header";
import { CardExchange } from "./CardExchange";
import { ClipLoader } from "react-spinners";

export const Main = () => {
  const MAX_LIMIT_ITEM = 100;

  const [page, setPage] = useState<number>(1);

  const { data: exchanges, isLoading } = useSWR(
    `https://api.coingecko.com/api/v3/exchanges/?per_page=${MAX_LIMIT_ITEM}&page=${page}`,
    async (...args) => {
      const response = await fetch(...args);

      const data = (await response.json()) as IExchange[];

      return data;
    },
    {
      revalidateOnFocus: true,
    }
  );

  function handlePage(newPage: number) {
    if (newPage >= 1) {
      setPage(newPage);
    }
  }

  console.log(page);

  return (
    <>
      <main className='flex flex-col items-center gap-4 h-screen mx-auto max-w-[1100px] mt-5'>
        <Header />

        <div className='flex flex-col items-center gap-2 w-full h-2/3 overflow-x-hidden overflow-y-auto bg-zinc-800 rounded-3xl'>
          {isLoading && (
            <>
              <div className='flex items-center justify-center w-full h-full'>
                <ClipLoader size={40} color='rgb(124 58 237)' />
              </div>
            </>
          )}
          {exchanges && (
            <>
              {exchanges?.length > 0 ? (
                <>
                  {exchanges.map((exchangeItem) => (
                    <CardExchange
                      key={exchangeItem.id}
                      exchangeItem={exchangeItem}
                    />
                  ))}
                </>
              ) : (
                <div>Não contém nenhum exchange</div>
              )}
            </>
          )}
        </div>

        <div className='w-full h-12 flex gap-2 items-center justify-end'>
          <button
            className='w-10 p-2 text-semibold bg-violet-600 text-white rounded-lg transition-colors hover:bg-violet-800 disabled:bg-gray-600'
            disabled={page === 1}
            onClick={() => handlePage(page - 1)}
          >
            {"<-"}
          </button>
          <button
            className='w-10 p-2 text-semibold bg-violet-600 text-white rounded-lg transition-colors hover:bg-violet-800'
            onClick={() => handlePage(page + 1)}
          >
            {"->"}
          </button>
        </div>
      </main>
    </>
  );
};

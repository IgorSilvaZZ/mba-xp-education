/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from "swr";

import { apiCoin } from "./lib/apiCoin";

interface ICoin {
  id: string;
  name: string;
}

export default function DataFetchingSWR() {
  const {
    data: allCoins,
    error,
    isLoading,
  } = useSWR(
    "/coins/markets",
    async (...args) => {
      const { data } = await apiCoin.get(...args, {
        params: {
          vs_currency: "usd",
        },
      });

      return data;
    },
    {
      revalidateOnFocus: true, // Toda vez que a aplicação for focada pelo usuário, ele vai refazer o fetcher novamente
    }
  );

  if (error) {
    return <div>Um erro foi encontrado!</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <ul>
        {allCoins.map((coinItem: ICoin) => (
          <li key={coinItem.id}>{coinItem.name}</li>
        ))}
      </ul>
    </>
  );
}

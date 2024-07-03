/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "react-query";

import { apiCoin } from "./lib/apiCoin";

interface ICoin {
  id: string;
  name: string;
}

export default function DataFetchingReactQuery() {
  const {
    data: allCoins,
    error,
    isLoading,
  } = useQuery("getAllCoins", async () => {
    const { data } = await apiCoin.get("/coins/markets", {
      params: {
        vs_currency: "usd",
      },
    });

    return data;
  });

  if (error) {
    return <div>Um erro foi encontrado!</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <ul>
        {allCoins &&
          allCoins.map((coinItem: ICoin) => (
            <li key={coinItem.id}>{coinItem.name}</li>
          ))}
      </ul>
    </>
  );
}

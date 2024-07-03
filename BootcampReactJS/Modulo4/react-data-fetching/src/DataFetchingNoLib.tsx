/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";

import { apiCoin } from "./lib/apiCoin";

interface ICoin {
  id: string;
  name: string;
}

const MAX_RETRY = 10;

export default function DataFetchingNoLib() {
  const [allCoins, setAllCoins] = useState<ICoin[]>();
  const [error, setError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiCoin.get("/coins/markets", {
          params: {
            vs_currency: "usd",
          },
        });

        setAllCoins(data);
        setError(false);
      } catch (err) {
        console.log(err);

        setError(true);
      }
    })();
  }, [retryCount]);

  useEffect(() => {
    if (error && retryCount < MAX_RETRY) {
      setTimeout(() => {
        setRetryCount((currentValue) => currentValue + 1);
      }, 2000);
    }
  }, [error, retryCount]);

  if (error) {
    return <div>Um erro foi encontrado!</div>;
  }

  if (!allCoins) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <ul>
        {allCoins.map((coinItem) => (
          <li key={coinItem.id}>{coinItem.name}</li>
        ))}
      </ul>
    </>
  );
}

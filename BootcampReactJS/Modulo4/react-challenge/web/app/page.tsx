"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";

import { ClubItem } from "./components/ClubItem";

import { years } from "./constants/year.constant";

import { getClassificationSorted } from "./utils/getClassificationSorted";

import brasileiraoImg from "./assets/brasileiraoImage.png";
import { ClipLoader } from "react-spinners";
import { IParticipantInfoMatch } from "./interfaces/IParticipantInfoMatch";

export default function Home() {
  const [yearSelected, setYearSelected] = useState<string>("2003");

  const { data: sortedClassification, isLoading } = useSWR(
    `http://localhost:3333/${yearSelected}`,
    async (...args) => {
      const response = await fetch(...args);

      const data = await response.json();

      const classificationSorted = (await getClassificationSorted(
        data
      )) as IParticipantInfoMatch[];

      return classificationSorted;
    }
  );

  function handleSelectedYear(year: string) {
    setYearSelected(year);
  }

  return (
    <>
      <main className='h-[90%] mx-auto w-3/4 bg-backgroundMain shadow-sm'>
        <div className='h-28 w-full gap-10 px-10 flex items-center bg-backgroundHeader'>
          <Image
            src={brasileiraoImg}
            width={50}
            height={50}
            alt='Brasileirao Image'
          />
          <div className='text-white'>
            <span className='text-lg font-bold'>Campeonato Brasileiro</span>
            <br />
            <span className='text-sm'>Brasileirão</span>
          </div>
        </div>
        <div className='w-full h-20 bg-white flex items-center justify-evenly font-semibold text-lg shadow-md'>
          <div className='w-60'>
            <select className='w-full outline-none'>
              <option value='Classificação Geral'>Classificação Geral</option>
            </select>
          </div>
          <div className='w-60'>
            <select className='w-full outline-none'>
              <option value='Serie A'>Serie A</option>
            </select>
          </div>
          <div className='w-60'>
            <select
              className='w-full outline-none'
              onChange={(e) => handleSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && (
          <div className='flex items-center justify-center w-full h-full'>
            <ClipLoader size={40} />
          </div>
        )}
        {sortedClassification && (
          <>
            <div className='w-full h-3/5 px-20 font-bold mt-8 overflow-y-auto'>
              <div className='flex flex-items justify-end text-zinc-500 text-xs'>
                <span className='w-20 text-center'>Pontos</span>
                <span className='w-20 text-center'>Vitorias</span>
                <span className='w-20 text-center'>Empates</span>
                <span className='w-20 text-center'>Derrotas</span>
                <span className='w-20 text-center'>Gols F</span>
                <span className='w-20 text-center'>Gols S</span>
                <span className='w-20 text-center'>Saldo</span>
              </div>
              <div className='w-full h-full mt-5'>
                {sortedClassification.map((matchItem, index) => (
                  <>
                    <ClubItem
                      key={matchItem.name}
                      position={index + 1}
                      matcherItem={matchItem}
                    />
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

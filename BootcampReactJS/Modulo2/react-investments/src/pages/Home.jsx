/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

import investmentsIcon from "../assets/investments.png";

import { Card } from "../components/Card";
import { FoundInformation } from "../components/FoundInformation";

import { dataInvestments } from "../data/investments";
import { calculatePercent } from "../utils/calculatePercent";

export default function Home() {
  const foundTypes = dataInvestments.investments.map((item) => {
    const investmentReport = dataInvestments.reports.filter(
      (report) => report.investmentId === item.id
    );

    const descReportsInvestment = investmentReport.sort(
      (a, b) => a.month - b.month
    );

    console.log(descReportsInvestment);

    const resultPercent = calculatePercent(descReportsInvestment);

    return {
      ...item,
      ...resultPercent,
    };
  });

  const [foundSelected, setFoundSelected] = useState(foundTypes[0]);

  function handleFoundSelected(idFound) {
    const typeFound = foundTypes.find((type) => type.id === idFound);

    if (!typeFound) {
      return;
    }

    setFoundSelected(typeFound);
  }

  return (
    <main className='w-[1000px] h-[550px] bg-backgroundMain rounded-xl'>
      <div className='w-full h-full flex justify-around'>
        <div className='flex flex-col w-[65%] h-full'>
          <div className='h-14 flex items-center'>
            <span className='text-white mt-3 text-lg'>React-Investiments</span>
          </div>
          <section className='flex justify-center items-center text-white h-[290px] w-full'>
            <div className='flex flex-col justify-center w-1/2 h-full gap-3 leading-tight'>
              <p className='font-bold text-4xl'>Investa no futuro</p>
              <span className='text-sm font-light'>
                Veja seus fundos rendimentos, rendimento total, percentual ao
                mês e etc..
              </span>
            </div>
            <div className='flex justify-end w-1/2'>
              <img src={investmentsIcon} alt='Investiment Icon' />
            </div>
          </section>
          <div className='h-48 w-full border-solid flex gap-4 overflow-x-auto box-border'>
            {foundTypes.map(
              ({ id, description, totalPerformance, totalPercent }) => (
                <Card
                  key={id}
                  id={id}
                  description={description}
                  totalPercent={totalPercent}
                  totalPerformance={totalPerformance}
                  handleFoundSelected={handleFoundSelected}
                />
              )
            )}
          </div>
        </div>
        <div className='w-[30%] h-[540px] flex flex-col bg-zinc-950 rounded-2xl my-1'>
          <FoundInformation foundSelected={foundSelected} />
        </div>
      </div>
    </main>
  );
}

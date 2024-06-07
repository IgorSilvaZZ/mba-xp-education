import investmentsIcon from "../assets/investments.png";

import { Card } from "../components/Card";
import { FoundInformation } from "../components/FoundInformation";

export default function Home() {
  return (
    <main className='w-[1000px] h-[550px] bg-backgroundMain rounded-xl'>
      <div className='w-full h-full flex justify-around'>
        <div className='flex flex-col w-[65%] h-full'>
          <div className='h-14 flex items-center'>
            <span className='text-white mt-3 text-lg'>React-Investiments</span>
          </div>
          <section className='flex justify-center items-center text-white h-[290px] w-full'>
            <div className='flex flex-col justify-center w-1/2 h-full gap-3 leading-tight'>
              <p className='font-bold text-4xl'>Invest in future</p>
              <span className='text-sm font-light'>
                Download the app to make your first investment and become Xureal
              </span>
            </div>
            <div className='flex justify-end w-1/2'>
              <img src={investmentsIcon} alt='Investiment Icon' />
            </div>
          </section>
          <div className='h-48 w-full border-solid flex gap-4 flex-nowrap overflow-x-auto box-border flex-content-scroll'>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className='w-[30%] h-[540px] flex flex-col bg-zinc-950 rounded-2xl my-1'>
          <FoundInformation />
        </div>
      </div>
    </main>
  );
}

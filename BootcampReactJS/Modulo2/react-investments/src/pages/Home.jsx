import investmentsIcon from "../assets/investments.png";

export default function Home() {
  return (
    <main className='w-[1000px] h-[550px] bg-backgroundMain rounded-xl'>
      <div className='w-full h-full flex justify-center'>
        <div className='flex flex-col w-[65%] h-full'>
          <div className='h-14 flex items-center'>
            <span className='text-white mt-3 text-lg'>React-Investiments</span>
          </div>
          <section className='flex justify-center items-center text-white h-[320px] w-full'>
            <div className='flex flex-col justify-center w-1/2 h-full gap-3 leading-tight'>
              <p className='font-bold text-4xl'>Invest in future</p>
              <span className='text-base font-light'>
                Download the app to make your first investment and become Xureal
              </span>
            </div>
            <div className='flex justify-end w-1/2'>
              <img src={investmentsIcon} alt='Investiment Icon' />
            </div>
          </section>
          <div className='h-40 border-solid border-purple-700 border-2'></div>
        </div>
        <div className='w-[33%] h-[540px] flex flex-col bg-zinc-950 rounded-2xl my-1'>
          <span className='text-gray-500'>Fundo de Ações</span>
        </div>
      </div>
    </main>
  );
}

import { CardExchange } from "./CardExchange";
import { Header } from "./Header";

export const Main = () => {
  return (
    <>
      <main className='flex flex-col items-center gap-4 mx-auto max-w-[1100px] mt-5'>
        <Header />

        <div className='flex flex-col items-center gap-2 w-full h-[400px] overflow-x-hidden bg-zinc-800 rounded-3xl'>
          <CardExchange />
        </div>
      </main>
      ;
    </>
  );
};

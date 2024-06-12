import { Header } from "./components/Header";
import { Main } from "./components/Main";

import "./index.css";

function App() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <main className='w-full max-w-7xl h-full max-h-[680px] flex flex-col gap-12 rounded-lg bg-zinc-900'>
        <Header />

        <Main />
      </main>
    </div>
  );
}

export default App;

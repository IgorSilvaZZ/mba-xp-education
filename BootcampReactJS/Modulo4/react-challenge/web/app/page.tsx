import Image from "next/image";

import santosImg from "./assets/santos.png";

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center gap-10 h-[90%] mx-auto w-3/4 bg-backgroundMain rounded-sm'>
        <div className='flex gap-5 items-center justify-center w-full mt-4'>
          <span className='font-semibold text-sm'>Selecione o Ano: </span>
          <select className='rounded-xl w-60 text-center p-2 outline-none font-bold border border-zinc-500'>
            <option value='2013'>2013</option>
            <option value='2014'>2014</option>
            <option value='2014'>2015</option>
            <option value='2014'>2016</option>
          </select>
        </div>
        <div className='w-10/12 flex flex-col gap-6 my-3 mx-1 h-full rounded-lg'>
          <div className='w-full flex flex-items justify-end font-bold border-b-[1px] border-zinc-400'>
            <span className='w-10 text-center'>P</span>
            <span className='w-10 text-center'>V</span>
            <span className='w-10 text-center'>E</span>
            <span className='w-10 text-center'>D</span>
            <span className='w-10 text-center'>GP</span>
            <span className='w-10 text-center'>GC</span>
            <span className='w-10 text-center'>S</span>
          </div>
          <div className='flex flex-col gap-1 items-center w-full h-[500px] overflow-y-auto'>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
            <div className='w-full h-20 flex flex-items rounded-lg'>
              <div className='flex items-center gap-5 w-28 px-3'>
                <span className='rounded-full font-bold text-base text-gray-600'>
                  1
                </span>
                <Image
                  src={santosImg}
                  width={45}
                  height={45}
                  alt='Club Image'
                />
              </div>
              <div className='flex items-center px-5 w-[700px]'>
                <span className='text-gray-700 font-semibold text-lg'>
                  Santos
                </span>
              </div>
              <div className='flex flex-1 items-center justify-center'>
                <span className='w-10 text-center'>71</span>
                <span className='w-10 text-center'>19</span>
                <span className='w-10 text-center'>15</span>
                <span className='w-10 text-center'>12</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>76</span>
                <span className='w-10 text-center'>14</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

import Image from "next/image";

import santosImg from "./../assets/santos.png";

export const ClubItem = () => {
  return (
    <>
      <div className='w-full h-16 my-3 flex flex-items bg-white rounded shadow-md'>
        <div className='flex items-center gap-5 w-28 px-3'>
          <span className='rounded-full font-semibold text-gray-600'>1</span>
          <Image src={santosImg} width={35} height={35} alt='Club Image' />
        </div>
        <div className='flex items-center px-5 w-[500px]'>
          <span className='font-bold'>Santos</span>
        </div>
        <div className='flex flex-1 items-center'>
          <span className='w-20 text-center'>71</span>
          <span className='w-20 text-center'>19</span>
          <span className='w-20 text-center'>15</span>
          <span className='w-20 text-center'>12</span>
          <span className='w-20 text-center'>76</span>
          <span className='w-20 text-center'>76</span>
          <span className='w-20 text-center'>14</span>
        </div>
      </div>
    </>
  );
};

/* eslint-disable @next/next/no-img-element */

import { useProductContext } from "../hooks/useProductContext";

export const ProductDetails = () => {
  const { handleCurrentView, handleSelectIdProduct } = useProductContext();

  function handleBackCurrentView() {
    handleCurrentView("list");
    handleSelectIdProduct(null);
  }

  return (
    <>
      <div className='w-2/3 h-full flex flex-col px-14 py-10'>
        <div className='w-full h-11'>
          <span
            className='text-2xl text-gray-400 cursor-pointer'
            onClick={handleBackCurrentView}
          >
            {"<-"}
          </span>
        </div>
        <div className='w-full flex flex-1 gap-3'>
          <div className='h-full w-1/2 flex justify-center items-center p-2'>
            <img
              className='w-4/5'
              src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
              alt='Product Image'
            />
          </div>
          <div className='w-1/2 flex flex-col item-center justify-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 p-2 flex justify-center items-center rounded-full text-center font-bold bg-fuchsia-800'>
                <img
                  className='w-full h-full'
                  src='https://fakestoreapi.com/icons/logo.png'
                  alt='Logo Image'
                />
              </div>
              <span className='text-sm font-bold'>Fake Store API</span>
            </div>
            <span className='text-xl font-semibold'>Name Product</span>
            <span className='text-xs'>
              <b>Categoria:</b> Categoria
            </span>
            <span className='text-xs font-semibold mb-7'>
              4.7 ⭐ <span className='text-gray-300'>| 30 Review(s)</span>
            </span>
            <span className='text-2xl font-bold'>R$ 115,00</span>
            <p className='text-sm'>
              Your perfect pack for everyday use and walks in the forest. Stash
              your laptop (up to 15 inches) in the padded sleeve, your everyday
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

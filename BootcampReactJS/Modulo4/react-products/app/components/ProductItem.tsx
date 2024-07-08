/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";

import { Product } from "../interfaces/Product";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <div className='flex items-center gap-5 w-4/5 h-32 rounded-lg border-2 border-gray-300'>
        <div className='flex items-center justify-center w-28 h-full p-2'>
          <img
            src={product.image}
            alt='Product Image'
            className='w-full h-full'
          />
        </div>
        <div className='h-full flex flex-1 flex-col justify-center gap-2'>
          <span className='text-xl font-semibold'>{product.title}</span>
          <span className='text-xs font-semibold'>
            {product.rating.rate} ⭐{" "}
            <span className='text-gray-300'>
              | {product.rating.count} Review(s)
            </span>
          </span>
          <span className='text-xs'>
            <b>Categoria:</b> {product.category}
          </span>
        </div>
        <div className='w-16 text-center text-2xl text-gray-400'>
          <span className='cursor-pointer'>
            <Link href='/products/[product]' as={`products/${product.id}`}>
              {"->"}
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

/* eslint-disable @next/next/no-async-client-component */

"use client";

import Image from "next/image";

import { Product } from "../interfaces/Product";

import productImage from "../images/shop-image.png";
import { ProductItem } from "../components/ProductItem";

export default async function Products() {
  const response = await fetch("https://fakestoreapi.com/products");

  const products = (await response.json()) as Product[];

  return (
    <>
      <div className='w-screen h-screen flex'>
        <div className='w-2/6 h-full flex items-center justify-center bg-imgBackground'>
          <Image className='w-1/2' src={productImage} alt='Illustrator Image' />
        </div>
        <div className='w-2/3 h-full flex flex-col justify-center gap-6 px-14 py-10'>
          <span className='text-2xl font-semibold'>Produtos</span>
          <div className='flex flex-col gap-3 w-full flex-1 overflow-y-auto'>
            {products.map((productItem: Product) => (
              <ProductItem key={productItem.id} product={productItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

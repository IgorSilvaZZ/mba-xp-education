import Image from "next/image";

import { ProductItem } from "./components/ProductItem";

import { Product } from "./interfaces/Product";

import { products } from "./products";

import productImage from "./images/shop-image.png";

export default function Home() {
  return (
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
  );
}

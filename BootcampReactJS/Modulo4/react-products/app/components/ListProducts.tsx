import { ProductItem } from "./ProductItem";

import { products } from "../products";

import { Product } from "../interfaces/Product";

export const ListProducts = () => {
  return (
    <>
      <div className='w-2/3 h-full flex flex-col justify-center gap-6 px-14 py-10'>
        <span className='text-2xl font-semibold'>Produtos</span>
        <div className='flex flex-col gap-3 w-full flex-1 overflow-y-auto'>
          {products.map((productItem: Product) => (
            <ProductItem key={productItem.id} product={productItem} />
          ))}
        </div>
      </div>
    </>
  );
};

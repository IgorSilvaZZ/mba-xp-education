"use client";

import Image from "next/image";

import { ListProducts } from "../components/ListProducts";
import { ProductDetails } from "../components/ProductDetails";

import { useProductContext } from "../hooks/useProductContext";

import productImage from "../images/shop-image.png";
import detailsImage from "../images/details-image.png";

import { fakeStoreApi } from "../lib/axio";
import { Product } from "../interfaces/Product";

interface MainProps {
  products: Product[];
}

export const Main = ({ products }: MainProps) => {
  const { currentView } = useProductContext();

  const imageView = currentView === "list" ? productImage : detailsImage;

  console.log(products);

  return (
    <>
      <div className='w-screen h-screen flex'>
        <div className='w-2/6 h-full flex items-center justify-center bg-imgBackground'>
          <Image className='w-1/2' src={imageView} alt='Illustrator Image' />
        </div>
        {currentView === "list" && <ListProducts />}
        {currentView === "details" && <ProductDetails />}
      </div>
    </>
  );
};

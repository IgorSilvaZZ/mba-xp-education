"use client";

import { Main } from "./main";

import { ProductContextProvider } from "../contexts/ProductContext";

import { Product } from "../interfaces/Product";

import { fakeStoreApi } from "../lib/axio";

interface ProductProps {
  products: Product[];
}

export const getStaticProps = async () => {
  const { data } = await fakeStoreApi.get("/products");

  console.log("getStaticProps data => ", data);

  return {
    props: {
      products: data,
    },
  };
};

export default function Products({ products }: ProductProps) {
  return (
    <>
      <ProductContextProvider>
        <Main products={products} />
      </ProductContextProvider>
    </>
  );
}

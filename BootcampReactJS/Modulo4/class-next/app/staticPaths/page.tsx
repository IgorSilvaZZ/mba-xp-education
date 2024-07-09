/* eslint-disable @next/next/no-async-client-component */

"use client";

import { IProduct } from "../interfaces/IProduct";

export default async function StaticPaths () {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = (await response.json()) as IProduct[];

  return (
    <>
      {products.map((productItem) => (
        <li key={productItem.id}>{productItem.title}</li>
      ))}
    </>
  );
}

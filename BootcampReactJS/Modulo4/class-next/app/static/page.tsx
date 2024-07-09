/* eslint-disable @next/next/no-async-client-component */

"use client";

import { StaticWithDeps } from "../components/StaticWithDeps";
import { StaticWithoutDeps } from "../components/StaticWithoutDeps";

import { IProduct } from "../interfaces/IProduct";

export default async function Static() {
  const response = await fetch("https://fakestoreapi.com/products");

  const products = (await response.json()) as IProduct[];

  return (
    <>
      {/* <StaticWithoutDeps /> */}
      <StaticWithDeps products={products} />
    </>
  );
}

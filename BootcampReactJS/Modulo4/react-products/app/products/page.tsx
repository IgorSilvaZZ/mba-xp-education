"use client";

import { Main } from "./main";

import { ProductContextProvider } from "../contexts/ProductContext";

export default function Products() {
  return (
    <>
      <ProductContextProvider>
        <Main />
      </ProductContextProvider>
    </>
  );
}

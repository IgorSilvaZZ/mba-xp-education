"use client";

import { useContext } from "react";

import { IProductContext } from "../interfaces/IProductContext";

import { ProductContext } from "../contexts/ProductContext";

export const useProductContext = (): IProductContext => {
  const context = useContext(ProductContext);

  return context;
};

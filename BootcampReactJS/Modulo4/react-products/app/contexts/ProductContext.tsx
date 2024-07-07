"use client";

import { createContext, ReactNode, useState } from "react";

import { IProductContext } from "../interfaces/IProductContext";

interface IProductContextProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext({} as IProductContext);

export const ProductContextProvider = ({
  children,
}: IProductContextProviderProps) => {
  const [currentView, setCurrentView] = useState<"details" | "list">("list");
  const [selectIdProduct, setSelectedProductId] = useState<number | null>(null);

  function handleCurrentView(newCurrent: "details" | "list") {
    setCurrentView(newCurrent);
  }

  function handleSelectIdProduct(productId: number | null) {
    setSelectedProductId(productId);
  }

  function clear() {
    setCurrentView("list");
    setSelectedProductId(null);
  }

  return (
    <>
      <ProductContext.Provider
        value={{
          currentView,
          selectIdProduct,
          clear,
          handleCurrentView,
          handleSelectIdProduct,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};

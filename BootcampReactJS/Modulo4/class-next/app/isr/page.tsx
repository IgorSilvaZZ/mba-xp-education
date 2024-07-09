import { IProduct } from "../interfaces/IProduct";

export default async function ISR() {
  const response = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  const products = (await response.json()) as IProduct[];

  return (
    <>
      {products.map((productItem) => (
        <li key={productItem.id}>{productItem.title}</li>
      ))}
    </>
  );
}

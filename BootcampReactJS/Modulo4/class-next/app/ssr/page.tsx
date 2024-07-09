import { IProduct } from "../interfaces/IProduct";

export default async function SSR() {
  /* Aqui o exemplo é o mesmo do Static, já que o app directory, todos os componentes sao renderizadas no servidor */
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

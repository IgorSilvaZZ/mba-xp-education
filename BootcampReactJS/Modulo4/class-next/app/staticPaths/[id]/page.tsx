/* eslint-disable @next/next/no-async-client-component */

import { IProduct } from "../../interfaces/IProduct";


/* É usado para criar uma pagina estatica com valores dinamicos de acordo com esses ids que sao coletados */
/* Ou seja para cada id é gerando um HTML via servidor e depois feito o fetch para coletar os restantes das informações */
export async function generateStaticParams() {
  const response = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
  const products = (await response.json()) as IProduct[];
 
  return products.map((product) => ({
    id: String(product.id),
  }))
}

export default async function ProductId ({ params }: { params: { id: string } }) {
  const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);

  const product = (await response.json()) as IProduct;

  return (
    <div>
      <span>Nome: {product.title}</span>
      <br />
      <span>Categoria: {product.category}</span>
      <br />
      <span>Preço: {product.price}</span>
    </div>
  );
}

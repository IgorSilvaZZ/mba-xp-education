/* eslint-disable @next/next/no-async-client-component */
import Image from "next/image";

import { IProduct } from "../interfaces/IProduct";

export default async function ImagePage() {

    const response = await fetch("https://fakestoreapi.com/products");
    const products = (await response.json()) as IProduct[];

  return (
    <>
        {/* <span>{locale === 'pt' ? 'Português' : 'Inglês'}</span> */}
        <ul>
        {products.map((productItem) => (
            <div key={productItem.id} style={{ display: 'flex', gap: '5px' }}>
                <li>{productItem.title}</li>
                {/* <img src={productItem.image} width={40} height={40} /> */}
                <Image src={productItem.image} width={40} height={40} alt="Product Image" />
            </div>
        ))}
        </ul>
    </>
  );
} 
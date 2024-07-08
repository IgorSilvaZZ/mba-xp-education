/* eslint-disable @next/next/no-img-element */

"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import Image from "next/image";

import { Product as IProduct } from "../../interfaces/Product";

import detailsImage from "../../images/details-image.png";

export default function Product() {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading } = useSWR("getProductId", async () => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${params?.product}`
    );

    const product = (await response.json()) as IProduct;

    return product;
  });

  return (
    <>
      {data && (
        <div className='w-screen h-screen flex'>
          <div className='w-2/6 h-full flex items-center justify-center bg-imgBackground'>
            <Image
              className='w-1/2'
              src={detailsImage}
              alt='Illustrator Image'
            />
          </div>
          <div className='w-2/3 h-full flex flex-col px-14 py-10'>
            <div className='w-full h-11'>
              <span
                className='text-2xl text-gray-400 cursor-pointer'
                onClick={() => router.push("/products")}
              >
                {"<-"}
              </span>
            </div>
            <div className='w-full flex flex-1 gap-3'>
              <div className='h-full w-1/2 flex justify-center items-center p-2'>
                <img className='w-4/5' src={data.image} alt='Product Image' />
              </div>
              <div className='w-1/2 flex flex-col item-center justify-center gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 p-2 flex justify-center items-center rounded-full text-center font-bold bg-fuchsia-800'>
                    <img
                      className='w-full h-full'
                      src='https://fakestoreapi.com/icons/logo.png'
                      alt='Logo Image'
                    />
                  </div>
                  <span className='text-sm font-bold'>Fake Store API</span>
                </div>
                <span className='text-xl font-semibold'>{data.title}</span>
                <span className='text-xs'>
                  <b>Categoria:</b> {data.category}
                </span>
                <span className='text-xs font-semibold mb-7'>
                  {data.rating.rate} ⭐{" "}
                  <span className='text-gray-300'>
                    | {data.rating.count} Review(s)
                  </span>
                </span>
                <span className='text-2xl font-bold'>
                  {data.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <p className='text-sm'>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

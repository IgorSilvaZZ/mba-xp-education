import { IProduct } from "../interfaces/IProduct";

interface IStaticWithDepsProps {
  products: IProduct[];
}

export const StaticWithDeps = ({ products }: IStaticWithDepsProps) => {
  return (
    <>
      <ul>
        {products.map((productItem) => (
          <li key={productItem.id}>{productItem.title}</li>
        ))}
      </ul>
    </>
  );
};

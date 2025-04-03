import { AddProduct } from "@/components/products";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");

      if (response.status == 404) {
        throw new Error("");
      }

      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AddProduct />
      <section className="mt-4">
        <div className="container max-w-section">
          <ul className="flex justify-between items-center">
            {products.map((product) => {
              const { id, imagePath, title, category, price, description } =
                product;

              return (
                <li key={id} className="max-w-[25rem]">
                  <img src={imagePath} alt={title} className="w-full" />
                  <h3 className="text-3xl font-bold truncate">{title}</h3>
                  <p className="text-lg font-medium">{category}</p>
                  <p className="text-xl text-green-500">{price}</p>
                  <p className="max-w-[25rem] truncate">{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

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
          <ul>
            {products.map((product) => {
              const { id, imagePath, title, category, price, description } =
                product;

              return (
                <li key={id}>
                  <img src={imagePath} alt={title} />
                  <h3>{title}</h3>
                  <p>{category}</p>
                  <p>{price}</p>
                  <p>{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

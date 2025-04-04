import { AddProduct } from "@/components/products";
import axiosInstance from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Button,
} from "@/components/ui";

interface Product {
  id: string;
  imagePath: string;
  title: string;
  category: string;
  price: string;
  description: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");

      if (response.status == 404) {
        throw new Error("");
      }

      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/products/:${id}`);
      console.log(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectedProduct((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const editProduct = async () => {
    if (!selectedProduct) return;

    try {
      await axiosInstance.patch(`/products/${selectedProduct.id}`, {
        imagePath: selectedProduct.imagePath,
        title: selectedProduct.title,
        category: selectedProduct.category,
        price: selectedProduct.price,
        description: selectedProduct.description,
      });

      setIsDialogOpen(false);
      getProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AddProduct />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <Input
                name="imagePath"
                value={selectedProduct.imagePath}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <Input
                name="title"
                value={selectedProduct.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <Input
                name="category"
                value={selectedProduct.category}
                onChange={handleChange}
                placeholder="Category"
              />
              <Input
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <Input
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={editProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <section className="mt-4">
        <div className="container max-w-section">
          <ul className="flex justify-between items-center">
            {products.map((product) => {
              const { id, imagePath, title, category, price, description } =
                product;
              return (
                <li
                  key={id}
                  className="max-w-[25rem] p-[0.9375rem] rounded-2xl relative shadow-lg bg-white hover:scale-[1.02] transition-transform"
                >
                  <img src={imagePath} alt={title} className="w-full" />
                  <h3 className="text-3xl font-bold truncate">{title}</h3>
                  <p className="text-lg font-medium">{category}</p>
                  <p className="text-xl text-green-500">{price}</p>
                  <p className="max-w-[25rem] truncate mb-3 h-[48px] overflow-hidden">
                    {description}
                  </p>
                  <div className="flex items-center gap-x-2 absolute bottom-2 right-2">
                    <FaEye
                      className="w-5 h-5 text-green-500 cursor-pointer"
                      onClick={() => handleEditClick(product)}
                    />
                    <MdDelete
                      className="w-5 h-5 text-red-500 cursor-pointer"
                      onClick={() => deleteProduct(id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

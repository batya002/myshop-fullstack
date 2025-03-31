import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  editProduct,
} from "../controller/productsControl.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/products", getProducts);

productRouter.get("/products/:id", getProduct);

productRouter.post("/products", createProduct);

productRouter.delete("/products/:id", deleteProduct);

productRouter.patch("/products/:id", editProduct);

export default productRouter;
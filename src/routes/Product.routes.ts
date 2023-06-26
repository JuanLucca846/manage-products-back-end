import express, { Request, Response, Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/products.controller";

const productRoutes = express.Router();

productRoutes.get("/products", getAllProducts);

productRoutes.get("/products/:id", getProductById);

productRoutes.post("/products", createProduct);

productRoutes.put("/products/:id", updateProduct);

productRoutes.delete("/products/:id", deleteProduct);

export default productRoutes;

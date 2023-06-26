import { Request, Response } from "express";
import { Product } from "../models/Product";
import { pool } from "../dbConfig";
import { createProductSchema } from "../schemas/createProduct.schema";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    return res.status(200).json({ products });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, msg: e });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    const product = result.rows[0];

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ msg: "Product not found!" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, msg: e });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newProduct: Product = req.body;
    const { name, price, description } = newProduct;
    await pool.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3)",
      [name, price, description]
    );
    return res.status(201).json({ msg: "Product added successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, msg: e });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const { name, price, description } = req.body;
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4",
      [name, price, description, productId]
    );

    if (result) {
      return res.status(200).json({ msg: "Product updated successfully!" });
    } else {
      return res.status(404).json({ msg: "Product not found!" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, msg: e });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM products WHERE id = $1", [
      productId,
    ]);

    if (result) {
      return res.status(200).json({ msg: "Product deleted successfully" });
    } else {
      return res.status(404).json({ msg: "Product not found!" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, msg: e });
  }
};

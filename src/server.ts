import express from "express";
import productRoutes from "./routes/Product.routes";
import { pool } from "./dbConfig";
import cors from "cors";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use(productRoutes);

server.listen(port, () => {
  console.log(`Connected ${port}`);
});

pool.connect();

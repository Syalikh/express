import express from "express";
import {
  deleteProduct,
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
} from "../controllers/productControlles.js";

const router = express.Router();

router.get("/product", getProducts);
router.get("/product/:id", getProductsById);
router.post("/product", saveProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
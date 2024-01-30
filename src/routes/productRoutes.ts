import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController";

const router = express.Router();

router.post("/new", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;

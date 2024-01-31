import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productController";

const router = express.Router();

router.post("/new", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);

export default router;

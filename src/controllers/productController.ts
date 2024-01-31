import { Request, Response } from "express";
import db from "../../models/index";

export const createProduct = async (req: Request, res: Response) => {
  const { productName, description, price } = req.body;

  try {
    if (!productName || !description || !price) {
      return res.status(401).json({ message: "Invalid Inputs" });
    }

    const productExists = await db.Product.findOne({
      where: { name: productName },
    });

    if (productExists) {
      return res.status(403).json({ message: "Product Already exists" });
    }

    const newProduct = await db.Product.create({
      name: productName,
      description,
      price,
    });

    return res.status(201).json({
      message: "Product  Created Successfully! ............",
      newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.Product.findAll({ include: [] });
    if (!products) {
      return res.status(404).json({ message: "No Products found" });
    }
    const productsNumber = products.length;
    return res.status(200).json({
      message: "Retrieving Products ......!!",
      products,
      TotalProducts: productsNumber,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    return res.status(200).json({ message: "Role Found !!!!!!", product });
  } catch (error) {}
  try {
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { productName, description, price } = req.body;

  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found !!! " });
    }
    if (req.body.productName) {
      product.name = req.body.productName;
    }
    if (req.body.description) {
      product.name = req.body.description;
    }
    if (req.body.price) {
      product.name = req.body.price;
    }

    const updatedProduct = await product.save();
    return res.status(200).json({
      message: "Product Updated Successfully.....!!",
      updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(200).json({
        message: "Product Not Found !!!",
      });
    }
    await product.destroy();

    return res.status(200).json({
      message: "Product deleted successfully !!.....",
    });
  } catch (error) {}
};

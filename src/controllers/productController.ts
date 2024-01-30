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

    return res
      .status(200)
      .json({
        message: "Product  Created Successfully! ............",
        newProduct,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
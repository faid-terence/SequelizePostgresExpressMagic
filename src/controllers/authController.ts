import { Request, Response } from "express";
import db from "../../models/index";

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Please provide all fields",
    });
  }
  try {
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

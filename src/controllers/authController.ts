import { Request, Response } from "express";
import db from "../../models/index";
import { hashPassword } from "../utilities/hashPassword";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }

    const userExists = await db.User.findOne({ where: { email } });

    if (userExists) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

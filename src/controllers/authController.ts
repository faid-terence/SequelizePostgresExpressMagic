import { Request, Response } from "express";
import db from "../../models/index";
import { hashPassword } from "../utilities/hashPassword";
import { where } from "sequelize";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utilities/generateToken";
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
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all fields",
    });
  }
  try {
    const userExists = await db.User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(403).json({
        message: "Invalid Credentials",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password.trim(),
      userExists.password
    );

    if (!passwordMatches) {
      return res.status(403).json({
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = await generateToken(userExists);
    console.log("Generated Token:", token);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};

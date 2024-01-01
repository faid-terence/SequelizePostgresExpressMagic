import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserAttributes } from "../Interfaces/index";

dotenv.config();

export const generateToken = async (user: UserAttributes) => {
  const jwtSecret = process.env.JWT_SECRET as Secret;

  try {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.Role,
      },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate JWT.");
  }
};

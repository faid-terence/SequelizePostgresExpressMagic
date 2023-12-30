import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserAttributes } from "../Interfaces/index";

dotenv.config();

export const generateToken = async (user: UserAttributes) => {
  const jwtSecret = process.env.JWT_SECRET as Secret;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    jwtSecret,
    { expiresIn: "1d" }
  );

  return token;
};

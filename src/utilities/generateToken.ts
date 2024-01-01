import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../models/index";
import { RoleAttributes, UserAttributes } from "../Interfaces/index";

dotenv.config();

export const generateToken = async (user: UserAttributes) => {
  const jwtSecret = process.env.JWT_SECRET as Secret;

  try {
    const userWithRoles = await db.User.findByPk(user.id, {
      include: [
        {
          model: db.Role,
          as: "Roles",
          attributes: ["Name"],
        },
      ],
    });

    if (!userWithRoles) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        id: userWithRoles.id,
        email: userWithRoles.email,
        firstName: userWithRoles.firstName,
        lastName: userWithRoles.lastName,
        roles: userWithRoles.Roles.map((role: RoleAttributes) => role.Name),
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

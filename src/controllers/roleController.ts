import { Request, Response } from "express";
import db from "../../models/index";

export const createRole = async (req: Request, res: Response) => {
  const { roleName, roleDescription } = req.body;

  try {
    if (!roleName || !roleDescription) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const roleExists = await db.Role.findOne({ where: { Name: roleName } });
    if (roleExists) {
      return res.status(403).json({ message: "Role already exists" });
    }

    const newRole = await db.Role.create({
      Name: roleName,
      description: roleDescription,
    });

    return res
      .status(201)
      .json({ message: "Role Created Successful......", newRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from "express";
import db from "../../models/index";

export const getUserRoles = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await db.User.findOne({ where: { id: id } });
  if (!user) {
    return res.status(404).json({
      message: "User not found in our database",
    });
  }
  const data = await db.User.findAll({
    include: [
      {
        model: db.Role,
        as: "Role",
      },
    ],
    where: { id: id },
  });
  return res.status(200).json({
    message: "Retrieving User Roles ...........",
    data,
  });
};

export const assignRoleToUser = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    // Check if the user and role exist
    const user = await db.User.findByPk(userId);
    const role = await db.Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or role not found" });
    }

    // Assign the role to the user
    await user.setRole(role);

    return res
      .status(200)
      .json({ message: "Role assigned to user successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

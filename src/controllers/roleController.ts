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

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await db.Role.findAll({ include: [] });
    if (!roles) {
      return res.status(404).json({ message: "No Roles Found" });
    }
    return res.status(200).json({ message: "Retrieving roles", roles });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  const roleId = req.params.id;
  if (!roleId) {
    return res.status(400).json({ message: "Invalid roleId" });
  }

  try {
    // const role = await db.Role.findOne({ where: { id: roleId } });
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role Not Found" });
    }
    return res.status(200).json({ message: "Retrieving role.......", role });
  } catch (error) {
    console.error("Error in getRoleById:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const roleId = req.params.id;
  const { roleName, roleDescription } = req.body;

  if (!roleId) {
    return res.status(400).json({ message: "Invalid roleId" });
  }
  try {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role Not Found" });
    }
    if (req.body.roleName) {
      role.Name = req.body.roleName;
    }
    if (req.body.roleDescription) {
      role.description = req.body.description;
    }

    const updatedRole = await role.save();
    return res.status(200).json({
      message: "Role Updated Successful...!",
      updatedRole,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRoleById = async (req: Request, res: Response) => {
  const roleId = req.params.id;

  if (!roleId) {
    return res.status(400).json({ message: "Invalid roleId" });
  }
  try {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role Not Found" });
    }
    await role.destroy();

    return res.status(200).json({ message: "Role deleted successful....." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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

// export const assignRoleToUser = async (req: Request, res: Response) => {
//   const { userId, roleId } = req.body;

//   try {
//     // Check if the user and role exist
//     const user = await db.User.findByPk(userId);
//     const role = await db.Role.findByPk(roleId);

//     if (!user || !role) {
//       return res.status(404).json({ message: "User or role not found" });
//     }

//     // Assign the role to the user
//     await user.setRole(role);

//     return res
//       .status(200)
//       .json({ message: "Role assigned to user successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const assignRoleToUser = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    // Check if the user and role exist
    const user = await db.User.findByPk(userId);
    const role = await db.Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or role not found" });
    }

    // Check if the user already has the role
    const hasRole = await user.hasRole(role);
    if (hasRole) {
      return res.status(400).json({ message: "User already has this role" });
    }

    // Assign the role to the user
    await user.addRole(role);

    return res
      .status(200)
      .json({ message: "Role assigned to user successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assuming your route is something like "/viewUserRoles/:userId"
export const viewUserRoles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Fetch the user with the specified ID along with their associated roles
    const userWithRoles = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Role,
          as: "Roles",
          attributes: ["Name", "description"],
        },
      ],
    });

    if (!userWithRoles) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract relevant information for response
    const userRoles = {
      userId: userWithRoles.id,
      username: userWithRoles.firstName,
      userEmail: userWithRoles.email,
      roles: userWithRoles.Roles.map((role: any) => ({
        roleId: role.id,
        roleName: role.Name,
        roleDescription: role.description,
      })),
    };

    return res.status(200).json({ userRoles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

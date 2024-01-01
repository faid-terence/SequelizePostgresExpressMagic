import { Request, Response } from "express";
import db from "../../models/index";
import { hashPassword } from "../utilities/hashPassword";

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({ include: [] });
    const totalUsers = users.length;
    if (!users) {
      return res.status(404).json({
        message: "No User Found in our Database",
      });
    }
    return res.status(200).json({
      message: "Retrieving Users ...............",
      users,
      TotalUsers: totalUsers,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await db.User.findOne({
      where: { id: id },
      include: [
        {
          model: db.Role,
          as: "Roles",
          attributes: ["id", "Name", "description"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const userData = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      Email: user.email,
      roles: user.Roles.map((role: any) => ({
        roleName: role.Name,
        roleDescription: role.description,
      })),
    };

    return res.status(200).json({
      message: "User Found",
      user: userData,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstName, lastName, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.password) {
      const newPassword = await hashPassword(req.body.password);
      user.password = newPassword;
    }
    await user.save();

    return res.status(201).json({
      message: "Profile Updated Successful.........",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await db.User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    await user.destroy();
    return res.status(200).json({
      message: "User deleted Successful.........",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

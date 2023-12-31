import { Request, Response } from "express";
import db from "../../models/index";

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
    const user = await db.User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "User Found.....!",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

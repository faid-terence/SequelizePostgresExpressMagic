import { NextFunction, Request, Response } from "express";
import db from "../../models/index";
import jwt, { Secret } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string; // Modify the type based on your actual userId type
  roles?: []; // Modify the type based on your actual role type
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  try {
    const token = authToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
      id: string;
      roles: [];
    };
    req.userId = decoded.id;
    req.roles = decoded.roles;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  }
};

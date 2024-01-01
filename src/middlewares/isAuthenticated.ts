import { NextFunction, Request, Response } from "express";
import db from "../../models/index";
import jwt, { Secret } from "jsonwebtoken";
import { RoleAttributes } from "../Interfaces";

interface CustomRequest extends Request {
  userId?: string;
  roles?: [];
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

export const restrict =
  (roles: string | string[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRoles: string[] = (req.roles || []) as string[];

    console.log("User Roles:", userRoles);

    if (Array.isArray(roles)) {
      console.log("Expected Roles:", roles);

      // Check if any of the user's roles are included in the specified roles
      const authorized = roles.some((role) => userRoles.includes(role));

      if (!authorized) {
        return res
          .status(401)
          .json({ success: false, message: "You're not authorized !!" });
      }
    } else {
      console.log("Expected Single Role:", roles);

      // Check if the user has the specified single role
      if (!userRoles.includes(roles)) {
        return res
          .status(401)
          .json({ success: false, message: "You're not authorized" });
      }
    }

    next();
  };

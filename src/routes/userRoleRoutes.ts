import express from "express";
import {
  assignRoleToUser,
  getUserRoles,
} from "../controllers/user-role.controller";

const router = express.Router();
router.get("/:id/getUserReviews", getUserRoles);
router.post("/assignRole", assignRoleToUser);
export default router;

import express from "express";
import {
  assignRoleToUser,
  getUserRoles,
  viewUserRoles,
} from "../controllers/user-role.controller";

const router = express.Router();
router.get("/:id/getUserReviews", getUserRoles);
router.post("/assignRole", assignRoleToUser);
router.get("/viewUserRoles/:userId", viewUserRoles);
export default router;

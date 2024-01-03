import express from "express";
import {
  assignRoleToUser,
  getUserRoles,
  unAssignRoleToUser,
  viewUserRoles,
} from "../controllers/user-role.controller";

const router = express.Router();
router.get("/:id/getUserReviews", getUserRoles);
router.post("/assignRole", assignRoleToUser);
router.get("/viewUserRoles/:userId", viewUserRoles);
router.post("/unassign/role", unAssignRoleToUser);
export default router;

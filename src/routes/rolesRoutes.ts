import express from "express";
import {
  createRole,
  deleteRoleById,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/roleController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/", isAuthenticated, getAllRoles);
router.post("/new", createRole);
router.get("/:id", getRoleById);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRoleById);

export default router;

import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/roleController";

const router = express.Router();

router.get("/", getAllRoles);
router.post("/new", createRole);
router.get("/:id", getRoleById);
router.patch("/:id", updateRole);

export default router;

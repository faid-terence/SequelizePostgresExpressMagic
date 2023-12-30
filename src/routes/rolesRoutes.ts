import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
} from "../controllers/roleController";

const router = express.Router();

router.get("/", getAllRoles);
router.post("/new", createRole);
router.get("/:id", getRoleById);

export default router;

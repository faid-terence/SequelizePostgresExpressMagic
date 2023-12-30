import express from "express";
import { createRole, getAllRoles } from "../controllers/roleController";

const router = express.Router();

router.get("/", getAllRoles);
router.post("/new", createRole);

export default router;

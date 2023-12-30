import express from "express";
import { createRole } from "../controllers/roleController";

const router = express.Router();

router.post("/new", createRole);

export default router;

import express from "express";
import { findAllUsers, findUserById } from "../controllers/userController";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findUserById);

export default router;

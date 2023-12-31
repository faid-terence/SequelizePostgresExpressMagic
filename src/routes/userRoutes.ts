import express from "express";
import { findAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", findAllUsers);

export default router;

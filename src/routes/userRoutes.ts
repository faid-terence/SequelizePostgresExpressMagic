import express from "express";
import {
  findAllUsers,
  findUserById,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/:id", updateUser);

export default router;

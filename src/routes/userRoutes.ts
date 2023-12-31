import express from "express";
import {
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

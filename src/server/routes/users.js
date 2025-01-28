import express from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser,
	authorizeUser,
	checkAuth
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/sign-in", authorizeUser)
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

export default router;

import express from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser,
	authorizeUser,
	checkAuth,
	verifyEmail,
	logout,
	forgotPassword,
	resetPassword,
	resendVerification
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/sign-up", createUser);
router.post("/sign-in", authorizeUser)
router.post("/logout", logout);

router.post("/email-verification/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

export default router;

import express from "express";
import {
	getAllAdmins,
	getAdminById,
	promoteToAdmin,
	demoteFromAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/:id/promote", promoteToAdmin);
router.post("/:id/demote", demoteFromAdmin);

export default router;

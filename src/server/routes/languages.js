import express from "express";
import {
	getAllLanguages,
	getLanguageById,
	createLanguage,
	deleteLanguage,
	updateLanguage,
} from "../controllers/languageController.js";

const router = express.Router();

router.get("/", getAllLanguages);
router.get("/:id", getLanguageById);
router.post("/", createLanguage);
router.delete("/:id", deleteLanguage);
router.patch("/:id", updateLanguage);

export default router;

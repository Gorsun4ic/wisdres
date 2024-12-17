import express from "express";
import {
	getAllAuthors,
	getAuthorById,
	createAuthor,
	deleteAuthor,
	updateAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.delete("/:id", deleteAuthor);
router.patch("/:id", updateAuthor);

export default router;

import express from "express";
import {
	getAllBooks,
	getBookById,
	createBook,
	deleteBook,
	updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

export default router;

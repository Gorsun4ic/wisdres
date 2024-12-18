import express from "express";
import {
	getAllBooks,
	getBookById,
	getBookDetails,
	getBookReviews,
	getBookInfo,
	createBook,
	deleteBook,
	updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/:id/info", getBookInfo);
router.get("/:id/reviews", getBookReviews);
router.get("/:id/details", getBookDetails);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

export default router;

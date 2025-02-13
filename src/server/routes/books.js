import express from "express";
import {
	getAllBooks,
	getBookById,
	getBooksByGenre,
	getBookDetails,
	getBookInfo,
	createBook,
	deleteBook,
	updateBook,
} from "../controllers/bookController.js";
import { createReview, getReviewsByBookId, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/genre/:genre", getBooksByGenre);
router.get("/:id/info", getBookInfo);
router.get("/:id/details", getBookDetails);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);
router.get("/:bookId/reviews", getReviewsByBookId);
router.delete("/:bookId/reviews/:reviewId", deleteReview);
router.post("/:id/reviews", createReview);

export default router;

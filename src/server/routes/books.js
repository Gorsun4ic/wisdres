import express from "express";
import {
	getAllBooks,
	getBookById,
	getBooksByGenre,
	getBookDetails,
	getBookReviews,
	getBookInfo,
	createBook,
	deleteBook,
	updateBook,
	addNewReview
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/genre/:genre", getBooksByGenre);
router.get("/:id/info", getBookInfo);
router.get("/:id/reviews", getBookReviews);
router.get("/:id/details", getBookDetails);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);
router.patch("/:id/reviews", addNewReview);

export default router;

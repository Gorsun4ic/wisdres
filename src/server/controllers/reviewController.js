import Review from "../models/review.js";
import Book from "../models/books.js";

export const createReview = async (req, res) => {
	const { rating, text, user } = req.body;
	const bookId = req.params.id;

	try {
		if (!user || !bookId) {
			return res.status(400).json({
				success: false,
				error: {
					message:
						"Something went wrong. Please, check if you are authenticated",
					code: 400,
				},
			});
		}

		const review = await Review.create({
			user: user,
			book: bookId,
			rating,
			text,
		});

		await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

		const book = await Book.findById(bookId).populate("reviews");
		if (book) {
			// Calculate new average rating
			const totalReviews = book.reviews.length;
			const totalRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
			const newAverageRating =
				totalReviews > 0 ? totalRating / totalReviews : 0;

			// Update the book's rating
			await Book.findByIdAndUpdate(bookId, {
				"info.rating": newAverageRating.toFixed(1),
			});
		}

		res.status(201).json({
			success: true,
			message: "Review created successfully",
			data: review,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: `Failed to create review ${error.message}`,
				code: 500,
			},
		});
	}
};

export const getReviewsByBookId = async (req, res) => {
	try {
		const { bookId } = req.params;
		const { page = 1, limit = 3 } = req.query; // Default page = 1, limit = 3
		const skip = (page - 1) * limit; // Calculate how many reviews to skip

		const reviews = await Review.find({ book: bookId })
			.populate("user")
			.skip(skip) // Skip previous reviews
			.limit(parseInt(limit)); // Limit number of reviews per request

		if (!reviews.length) {
			return res.status(404).json({
				success: false,
				error: {
					message: "No reviews found for this book",
					code: 404,
				},
			});
		}

		const totalReviews = await Review.countDocuments({ book: bookId });

		res.status(200).json({
			success: true,
			message: "Successfully received all reviews for requested book",
			data: {
				reviews,
				hasMore: skip + parseInt(limit) < totalReviews, // Check if more reviews exist,
				totalReviews,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: `Error fetching reviews: ${error.message}`,
				code: 500,
			},
		});
	}
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
	const { reviewId } = req.params;

	try {
		// Find and delete the review
		const deletedReview = await Review.findByIdAndDelete(reviewId);

		if (!deletedReview) {
			return res.status(404).json({
				success: false,
				error: { message: "No review associated with this id.", code: 404 },
			});
		}

		// Remove review reference from the book
		await Book.findByIdAndUpdate(
			deletedReview.book, // Assuming we store bookId in review
			{ $pull: { reviews: reviewId } }
		);

		return res.status(200).json({
			success: true,
			message: "Review has been deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: { message: "Failed to delete review", code: 500 },
		});
	}
};

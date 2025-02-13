import Review from "../models/review.js";
import Book from "../models/books.js";

export const createReview = async (req, res) => {

	const { rating, text, user } = req.body;
	const bookId = req.params.id;

	try {
		if (!user || !bookId) {
			return res.status(400).json({ message: "Something went wrong. Please, check if you are authenticated" });
		}

		const review = await Review.create({
			user: user,
			book: bookId,
			rating,
			text,
		});

		await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

		res.status(201).json({ success: true, message: "Review created successfully", review });
	} catch (error) {
		res.status(500).json({ message: `Failed to create review ${error.message}`, success: false });
	}
};

export const getReviewsByBookId = async (req, res) => {
	try {
		const { bookId } = req.params;

		const reviews = await Review.find({ book: bookId }).populate("user");

		if (!reviews.length) {
			return res
				.status(404)
				.json({ message: "No reviews found for this book" });
		}

		res.status(200).json(reviews);
	} catch (error) {
		console.error("Error fetching reviews:", error); // Debugging
		res
			.status(500)
			.json({ message: `Error fetching reviews: ${error.message}` });
	}
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
	const { reviewId } = req.params;
	try {
		const review = await Review.findOne({ _id: reviewId });

		if (!review) {
			return res.status(404).json({
				success: false,
				error: { message: "No review associated with this id." },
			});
		}

		await Review.findByIdAndDelete(review._id);


		return res.status(200).json({
			success: true,
			message: "Review has been deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: { message: "Failed to delete review" },
		});
	}
};

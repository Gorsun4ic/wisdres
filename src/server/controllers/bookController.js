import Book from "../models/Books.js";
import Author from "../models/Author.js";
import Genre from "../models/Genre.js";

// Get all books with populated fields
export const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find()
			.populate("info.author")
			.populate("info.publisher")
			.populate("info.genre")
			.populate("info.language");
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch books" });
	}
};

// Get a book by ID
export const getBookById = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id)
			.populate("info.author")
			.populate("info.publisher")
			.populate("info.genre")
			.populate("info.language");
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch book" });
	}
};

export const getBooksByGenre = async (req, res) => {
	const genreInput = req.params.genre.trim(); // Trim the genre input to avoid issues with spaces

	// Use case-insensitive search to ensure we handle different cases
	try {
		const foundGenre = await Genre.findOne({
			title: { $regex: new RegExp(`^${genreInput}$`, "i") },
		});

		if (!foundGenre) {
			return res.status(404).json({ message: "Genre not found" });
		}

		const books = await Book.find({ "info.genre": foundGenre._id });
		res.status(200).json(books);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Get book's reviews by ID
export const getBookReviews = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book.reviews);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch book" });
	}
};

// Get book's details by ID
export const getBookDetails = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book.details);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch book" });
	}
};

// Get book's info by ID
export const getBookInfo = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id)
			.populate("info.author")
			.populate("info.publisher")
			.populate("info.genre")
			.populate("info.language");
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book.info);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch book" });
	}
};

// Create a new book
export const createBook = async (req, res) => {
	const { info, details, reviews } = req.body;

	try {
		// 1. Create the new book
		const newBook = new Book({
			info,
			details,
			reviews,
		});

		// Save the book to the database
		await newBook.save();

		// 2. Check if the author ID is provided in the book info
		if (info.author) {
			// Update the author's `bookIds` array
			await Author.findByIdAndUpdate(info.author, {
				$push: { bookIds: newBook._id },
			});
		}

		// 3. Respond with the newly created book
		res.status(201).json(newBook);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to add book" });
	}
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedBook = await Book.findByIdAndDelete(id);
		if (!deletedBook) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json({ message: "Book deleted successfully", book: deletedBook });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete book" });
	}
};

export const updateBook = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	console.log("Received updates:", updates);

	if (updates && updates.reviews) {
		const review = updates.reviews;
		console.log("Received review:", review);

		try {
			const updatedBook = await Book.findByIdAndUpdate(
				id,
				{ $push: { reviews: review } },
				{ new: true, runValidators: true }
			);

			if (!updatedBook) {
				return res.status(404).json({ error: "Book not found" });
			}

			return res.json(updatedBook);
		} catch (error) {
			console.error("Error updating book:", error);
			return res.status(500).json({ error: "Failed to update book" });
		}
	} else {
		return res
			.status(400)
			.json({ error: "'reviews' is missing in the request body" });
	}
};

export const addNewReview = async (req, res) => {
	const { id } = req.params;
	const review = req.body;

	try {
		if (!review) {
			s;
			return res.status(400).json({
				success: false,
				error: {
					message: "Review is required!",
				},
			});
		}

		console.log("Received review: ", review);

		const book = await Book.findById(id);
		if (!book) {
			console.warn(`[updateBook] Book with ID ${id} not found.`);
			return res.status(404).json({ error: "Book not found" });
		}

		book.reviews.push(review);
		await book.save();
		return res.json(book);
	} catch (error) {
		console.error(`[updateBook] Error updating book ${req.params.id}:`, error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

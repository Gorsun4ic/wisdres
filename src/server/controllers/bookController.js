import Book from "../models/Books.js";
import Author from "../models/Author.js";
import Publisher from "../models/Publisher.js";
import Genre from "../models/Genre.js";

// Get all books with populated fields
export const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find()
			.populate({
				path: "info.author",
				// If author not found, set default values
				options: {
					default: {
						_id: "default",
						title: "Unknown Author",
					},
				},
			})
			.populate({
				path: "info.publisher",
				// If publisher not found, set default values
				options: {
					default: {
						_id: "default",
						title: "Unknown Publisher",
					},
				},
			})
			.populate({
				path: "info.genre",
				// If genre not found, set default values
				options: {
					default: {
						_id: "default",
						title: "Unknown Genre",
					},
				},
			})
			.populate({
				path: "info.language",
				// If language not found, set default values
				options: {
					default: {
						_id: "default",
						title: "Unknown Language",
					},
				},
			});

		res.json({
			success: true,
			message: "Received all books",
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: `Failed to fetch books: ${error.message}`,
				code: 500
			},
		});
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
			.populate("info.language")
			.populate({
				path: "reviews",
				populate: { path: "user", select: "username" }, // Fetch user details
			});
		if (!book) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Book not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Found requested book",
			data: book,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: `Failed to fetch book: ${error.message}`,
				code: 500
			},
		});
	}
};

export const getBooksByGenre = async (req, res) => {
	const genreInput = req.params.genre; // Trim the genre input to avoid issues with spaces
	const {page = 1, limit = 25} = req.query;
	const skip = (page - 1) * limit;

	// Use case-insensitive search to ensure we handle different cases
	try {
		const foundGenre = await Genre.findOne({
			"title.en": new RegExp(genreInput.trim(), "i"),
		});

		if (!foundGenre) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Genre not found",
					code: 404
				},
			});
		}

		const totalBooks = await Book.countDocuments({"info.genre": foundGenre._id});
		const books = await Book.find({ "info.genre": foundGenre._id })
		.populate({
			path: "info.author",
			select: "title",
		})
		.skip(skip)
		.limit(parseInt(limit))
		res.status(200).json({
			success: true,
			message: "Successfully found books for requested genre",
			data: {
				books,
				totalBooks,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Server error",
				code: 500
			},
		});
	}
};

// Get book's details by ID
export const getBookDetails = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Book not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Found details for requested book",
			data: book.details,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch book details",
				code: 500
			},
		});
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
			return res.status(404).json({
				success: false,
				error: {
					message: "Book info not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Found info for requested book",
			data: book.info,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch book",
				code: 500
			},
		});
	}
};

// Create a new book
export const createBook = async (req, res) => {
	const { info, details, reviews } = req.body;

	if (!info.rating) {
		info.rating = 5;
	}

	if (!info.arrived) {
		info.arrived = new Date();
	}

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

		// 3. Check if the publisher ID is provided in the book info
		if (info.publisher) {
			// Update the publisher's `bookIds` array
			await Publisher.findByIdAndUpdate(info.publisher, {
				$push: { bookIds: newBook._id },
			});
		}

		// 3. Respond with the newly created book
		res.status(201).json({
			success: true,
			message: "Book was successfully added",
			data: newBook,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add book",
				code: 500
			},
		});
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

		await Author.findByIdAndUpdate(deletedBook.info.author, {
			$pull: { bookIds: id },
		});

		await Publisher.findByIdAndUpdate(deletedBook.info.publisher, {
			$pull: { bookIds: id },
		});

		res.json({ success: true, message: "Book deleted successfully", data: deletedBook });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to delete book",
				code: 500
			},
		});
	}
};

export const updateBook = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const updatedBook = await Book.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!updatedBook) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Book not found",
				},
			});
		}

		return res.json({
			success: true,
			message: "Book was successfully updated!",
			data: updatedBook,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update book",
				code: 500
			},
		});
	}
};

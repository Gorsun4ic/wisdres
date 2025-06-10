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

		res.json(books);
	} catch (error) {
		res.status(500).json({ error: `Failed to fetch books: ${error.message}` });
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
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book);
	} catch (error) {
		res.status(500).json({ error: `Failed to fetch book: ${error.message}` });
	}
};

export const getBooksByGenre = async (req, res) => {
	const genreInput = req.params.genre; // Trim the genre input to avoid issues with spaces
	console.log(req.params);
	const {page = 1, limit = 25} = req.query;
	const skip = (page - 1) * limit;

	// Use case-insensitive search to ensure we handle different cases
	try {
		const foundGenre = await Genre.findOne({
			title: new RegExp(genreInput.trim(), "i"),
		});

		if (!foundGenre) {
			return res.status(404).json({ message: "Genre not found" });
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
			books,
			totalBooks
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
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

		await Author.findByIdAndUpdate(deletedBook.info.author, {
			$pull: { bookIds: id },
		});

		await Publisher.findByIdAndUpdate(deletedBook.info.publisher, {
			$pull: { bookIds: id },
		});

		res.json({ message: "Book deleted successfully", book: deletedBook });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete book" });
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
			return res.status(404).json({ error: "Book not found" });
		}

		return res.json(updatedBook);
	} catch (error) {
		res.status(500).json({ error: "Failed to update book" });
	}
};

import Book from "../models/books.js";

// Get all books
export const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch books" });
	}
};

// Get a book by ID
export const getBookById = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(book);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch book" });
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
			const book = await Book.findById(id);
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
	const {
		info,
		details,
		reviews
	} = req.body;
	try {
		const newBook = new Book({
			info,
			details,
			reviews
		});
		await newBook.save();
		res.status(201).json(newBook);
	} catch (error) {
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

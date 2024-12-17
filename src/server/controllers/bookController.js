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

// Create a new book
export const createBook = async (req, res) => {
	const {
		img,
		rating,
		title,
		genre,
		author,
		publisher,
		language,
		year,
		pages,
	} = req.body;
	try {
		const newBook = new Book({
			img,
			rating,
			title,
			genre,
			author,
			publisher,
			language,
			year,
			pages,
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

// Update a book by ID
export const updateBook = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedBook) {
			return res.status(404).json({ error: "Book not found" });
		}
		res.json(updatedBook);
	} catch (error) {
		res.status(500).json({ error: "Failed to update book" });
	}
};

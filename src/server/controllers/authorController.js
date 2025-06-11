import Author from "../models/Author.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.find();
		res.json(authors);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch authors" });
	}
};

// Get a author by ID
export const getAuthorById = async (req, res) => {
	const { id } = req.params;
	try {
		const author = await Author.findById(id);
		if (!author) {
			return res.status(404).json({ error: "Author not found" });
		}
		res.json(author);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch author" });
	}
};

// Create a new author
export const createAuthor = async (req, res) => {
	const {
		img,
		title,
		about
	} = req.body;
	try {
		const newAuthor = new Author({
			img,
			title,
			about,
		});
		await newAuthor.save();
		res.status(201).json(newAuthor);
	} catch (error) {
		console.error(" ERROR:", error);
		res.status(500).json({ error: "Failed to add author" });
	}
};

// Delete an author by ID
export const deleteAuthor = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedAuthor = await Author.findByIdAndDelete(id);
		if (!deletedAuthor) {
			return res.status(404).json({ error: "Author not found" });
		}
		res.json({ message: "Author deleted successfully", author: deletedAuthor });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete author" });
	}
};

// Update an author by ID
export const updateAuthor = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedAuthor) {
			return res.status(404).json({ error: "Author not found" });
		}
		res.json(updatedAuthor);
	} catch (error) {
		console.error("UPDATE ERROR:", error);
		res.status(500).json({ error: "Failed to update author" });
	}
};

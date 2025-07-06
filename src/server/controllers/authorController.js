import Author from "../models/author.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.find();
		res.json({
			success: true,
			message: "Received all authors",
			data: authors,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch authors",
				error: 500,
			},
		});
	}
};

// Get a author by ID
export const getAuthorById = async (req, res) => {
	const { id } = req.params;
	try {
		const author = await Author.findById(id);
		if (!author) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Author not found",
					code: 404,
				},
			});
		}
		res.json({
			success: true,
			message: "Found requested author",
			data: author,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch author",
				code: 500,
			},
		});
	}
};

// Create a new author
export const createAuthor = async (req, res) => {
	const { img, title, about } = req.body;
	try {
		const newAuthor = new Author({
			img,
			title,
			about,
		});
		await newAuthor.save();
		res.status(201).json({
			success: true,
			message: "Author was successfully added!",
			data: newAuthor,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add author",
				code: 500,
			},
		});
	}
};

export const createAuthorsBatch = async (req, res) => {
	const authors = req.body;

	if (!Array.isArray(authors) || authors.length === 0) {
		return res.status(400).json({
			success: false,
			error: {
				message: "No authors provided",
				code: 400,
			},
		});
	}

	const isValid = authors.every(
		(author) =>
			author.img &&
			author.title.en &&
			author.title.ua &&
			author.about.en &&
			author.about.ua
	);

	if (!isValid) {
		return res.status(400).json({
			success: false,
			error: {
				message: "Invalid author data format",
				code: 400,
			},
		});
	}

	try {
		const newAuthors = await Author.insertMany(authors);
		res.status(201).json({
			success: true,
			message: "Authors added successfully",
			data: newAuthors,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add authors",
				code: 500,
			},
		});
	}
};

// Delete an author by ID
export const deleteAuthor = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedAuthor = await Author.findByIdAndDelete(id);
		if (!deletedAuthor) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Author not found",
					code: 404,
				},
			});
		}
		res.json({
			success: true,
			message: "Author deleted successfully",
			data: deletedAuthor,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to delete author",
				code: 500
			},
		});
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
			return res.status(404).json({
				success: false,
				error: {
					message: "Author not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Author was successfully updated!",
			data: updatedAuthor,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update author",
				code: 500
			},
		});
	}
};

import Genre from "../models/Genre.js";

// Get all genres

export const getAllGenres = async (req, res) => {
	try {
		const genre = await Genre.find();
		res.json(genre);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch genres" });
	}
};

// Get a genres by ID
export const getGenreById = async (req, res) => {
	const { id } = req.params;
	try {
		const genre = await Genre.findById(id);
		if (!genre) {
			return res.status(404).json({ error: "genre not found" });
		}
		res.json(genre);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch genre" });
	}
};

// Create a new genre
export const createGenre = async (req, res) => {
	const { img, title } = req.body;
	try {
		const newGenre = new Genre({
			img,
			title,
		});
		await newGenre.save();
		res.status(201).json(newGenre);
	} catch (error) {
		res.status(500).json({ error: "Failed to add genre" });
	}
};

// Delete a genre by ID
export const deleteGenre = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteGenre = await Genre.findByIdAndDelete(id);
		if (!deleteGenre) {
			return res.status(404).json({ error: "genre not found" });
		}
		res.json({
			message: "genre deleted successfully",
			genre: deleteGenre,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to delete genre" });
	}
};

// Update an genre by ID
export const updateGenre = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedGenre = await Genre.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedGenre) {
			return res.status(404).json({ error: "genre not found" });
		}
		res.json(updateGenre);
	} catch (error) {
		res.status(500).json({ error: "Failed to update genre" });
	}
};

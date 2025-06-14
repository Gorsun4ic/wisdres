import Genre from "../models/Genre.js";

// Get all genres

export const getAllGenres = async (req, res) => {
	try {
		const genres = await Genre.find();
		res.json({
			success: true,
			message: "Received all genres",
			data: genres,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch genres",
				code: 500
			},
		});
	}
};

// Get a genres by ID
export const getGenreById = async (req, res) => {
	const { id } = req.params;
	try {
		const genre = await Genre.findById(id);
		if (!genre) {
			return res.status(404).json({
				success: false,
				error: {
					message: "genre not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Found requested genre",
			data: genre
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch genre",
				code: 500
			},
		});
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
		res.status(201).json({
			success: true,
			message: "Successfully added new genre!",
			data: newGenre,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add genre",
				code: 500
			},
		});
	}
};

// Add multiple genres at once
export const createGenresBatch = async (req, res) => {
	const genres = req.body;

	if (!Array.isArray(genres) || genres.length === 0) {
		return res.status(400).json({
			success: false,
			error: {
				message: "No genres provided",
				code: 400,
			},
		});
	}

	const isValid = genres.every(
		(genre) =>
			genre.img.en &&
			genre.img.ua &&
			genre.title.en &&
			genre.title.ua
	);

	if (!isValid) {
		return res.status(400).json({
			success: false,
			error: {
				message: "Invalid genre data format",
				code: 400,
			},
		});
	}

	try {
		const newGenres = await Genre.insertMany(genres);
		res.status(201).json({
			success: true,
			message: "Genres added successfully",
			data: newGenres,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add genres",
				code: 500,
			},
		});
	}
};

// Delete a genre by ID
export const deleteGenre = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteGenre = await Genre.findByIdAndDelete(id);
		if (!deleteGenre) {
			return res.status(404).json({
				success: false,
				error: {
					message: "genre not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Genre was successfully deleted!",
			data: deleteGenre,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to delete genre",
				code: 500
			},
		});
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
			return res.status(404).json({
				success: false,
				error: {
					message: "Genre not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Genre was successfully updated!",
			data: updateGenre,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update genre",
				code: 500
			},
		});
	}
};

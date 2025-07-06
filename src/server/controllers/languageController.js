import Language from "../models/language.js";

// Get all languages
export const getAllLanguages = async (req, res) => {
	try {
		const language = await Language.find();
		res.json({
			success: true,
			message: "Received all languages!",
			data: language,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch languages",
				code: 500
			},
		});
	}
};

// Get a languages by ID
export const getLanguageById = async (req, res) => {
	const { id } = req.params;
	try {
		const language = await Language.findById(id);
		if (!language) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Language not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Found requested language!",
			data: language,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch language",
				code: 500
			},
		});
	}
};

// Create a new language
export const createLanguage = async (req, res) => {
	const { img, title } = req.body;
	try {
		const newLanguage = new Language({
			img,
			title,
		});
		await newLanguage.save();
		res.status(201).json({
			success: true,
			message: "Successfully added new language",
			data: newLanguage,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add language",
				code: 500
			},
		});
	}
};

// Create multiple languages at once
export const createLanguagesBatch = async (req, res) => {
	const languages = req.body;

	if (!Array.isArray(languages) || languages.length === 0) {
		return res.status(400).json({
			success: false,
			error: {
				message: "No languages provided",
				code: 400,
			},
		});
	}

	const isValid = languages.every(
		(language) =>
			language.title.en &&
			language.title.ua
	);

	if (!isValid) {
		return res.status(400).json({
			success: false,
			error: {
				message: "Invalid language data format",
				code: 400,
			},
		});
	}

	try {
		const newLanguages = await Language.insertMany(languages);
		res.status(201).json({
			success: true,
			message: "Languages added successfully",
			data: newLanguages,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add languages",
				code: 500,
			},
		});
	}
};

// Delete a language by ID
export const deleteLanguage = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteLanguage = await Language.findByIdAndDelete(id);
		if (!deleteLanguage) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Language not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "language deleted successfully",
			data: deleteLanguage,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to delete language",
				code: 500
			},
		});
	}
};

// Update an language by ID
export const updateLanguage = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedLanguage = await Language.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedLanguage) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Language not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "Language was successfully updated",
			data: updateLanguage,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update language",
				code: 500
			},
		});
	}
};

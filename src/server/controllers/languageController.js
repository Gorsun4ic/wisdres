import Language from "../models/language.js";

// Get all languages
export const getAllLanguages = async (req, res) => {
	try {
		const language = await Language.find();
		res.json(language);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch languages" });
	}
};

// Get a languages by ID
export const getLanguageById = async (req, res) => {
	const { id } = req.params;
	try {
		const language = await Language.findById(id);
		if (!language) {
			return res.status(404).json({ error: "language not found" });
		}
		res.json(language);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch language" });
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
		res.status(201).json(newLanguage);
	} catch (error) {
		res.status(500).json({ error: "Failed to add language" });
	}
};

// Delete a language by ID
export const deleteLanguage = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteLanguage = await Language.findByIdAndDelete(id);
		if (!deleteLanguage) {
			return res.status(404).json({ error: "language not found" });
		}
		res.json({
			message: "language deleted successfully",
			language: deleteLanguage,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to delete language" });
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
			return res.status(404).json({ error: "language not found" });
		}
		res.json(updateLanguage);
	} catch (error) {
		res.status(500).json({ error: "Failed to update language" });
	}
};

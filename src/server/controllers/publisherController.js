import Publisher from "../models/Publisher.js"

// Get all publishers
export const getAllPublishers = async (req, res) => {
	try {
		const publisher = await Publisher.find();
		res.json(publisher);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch publishers" });
	}
};

// Get a publishers by ID
export const getPublisherById = async (req, res) => {
	const { id } = req.params;
	try {
		const publisher = await Publisher.findById(id);
		if (!publisher) {
			return res.status(404).json({ error: "Publisher not found" });
		}
		res.json(publisher);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch publisher" });
	}
};

// Create a new publisher
export const createPublisher = async (req, res) => {
	const { img, title, about } = req.body;
	try {
		const newPublisher = new Publisher({
			img,
			title,
			about,
		});
		await newPublisher.save();
		res.status(201).json(newPublisher);
	} catch (error) {
		res.status(500).json({ error: "Failed to add publisher" });
	}
};

// Delete a publisher by ID
export const deletePublisher = async (req, res) => {
	const { id } = req.params;
	try {
		const deletePublisher = await Publisher.findByIdAndDelete(id);
		if (!deletePublisher) {
			return res.status(404).json({ error: "Publisher not found" });
		}
		res.json({ message: "Publisher deleted successfully", publisher: deletePublisher });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete publisher" });
	}
};

// Update an publisher by ID
export const updatePublisher = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedPublisher = await Publisher.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedPublisher) {
			return res.status(404).json({ error: "Publisher not found" });
		}
		res.json(updatedPublisher);
	} catch (error) {
		res.status(500).json({ error: "Failed to update publisher" });
	}
};

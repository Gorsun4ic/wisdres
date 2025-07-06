import Publisher from "../models/Publisher.js";

// Get all publishers
export const getAllPublishers = async (req, res) => {
	try {
		const publisher = await Publisher.find();
		res.json({
			success: true,
			message: "Received all publishers",
			data: publisher,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch publishers",
				code: 500,
			},
		});
	}
};

// Get a publishers by ID
export const getPublisherById = async (req, res) => {
	const { id } = req.params;
	try {
		const publisher = await Publisher.findById(id);
		if (!publisher) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Publisher not found",
					code: 404,
				},
			});
		}
		res.json({
			success: true,
			message: "Requested publisher was found!",
			data: publisher,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch publisher",
				code: 500,
			},
		});
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
		res.status(201).json({
			success: true,
			message: "New publisher was successfully added",
			data: newPublisher,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add publisher",
				code: 500,
			},
		});
	}
};

// Create multiple publishers at once
export const createPublishersBatch = async (req, res) => {
	const publishers = req.body;

	if (!Array.isArray(publishers) || publishers.length === 0) {
		return res.status(400).json({
			success: false,
			error: {
				message: "No publishers provided",
				code: 400,
			},
		});
	}

	const isValid = publishers.every(
		(publisher) =>
			publisher.img &&
			publisher.title &&
			publisher.about.en &&
			publisher.about.ua
	);

	if (!isValid) {
		return res.status(400).json({
			success: false,
			error: {
				message: "Invalid publisher data format",
				code: 400,
			},
		});
	}

	try {
		const newPublishers = await Publisher.insertMany(publishers);
		res.status(201).json({
			success: true,
			message: "Publishers added successfully",
			data: newPublishers,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to add Publishers",
				code: 500,
			},
		});
	}
};


// Delete a publisher by ID
export const deletePublisher = async (req, res) => {
	const { id } = req.params;
	try {
		const deletePublisher = await Publisher.findByIdAndDelete(id);
		if (!deletePublisher) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Publisher not found",
					code: 404,
				},
			});
		}
		res.json({
			success: true,
			message: "Publisher deleted successfully",
			data: deletePublisher,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to delete publisher",
				code: 500,
			},
		});
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
			return res.status(404).json({
				success: false,
				error: {
					message: "Publisher not found",
					code: 404,
				},
			});
		}
		res.json({
			success: true,
			message: "Publisher was successfully updated",
			data: updatedPublisher,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update publisher",
				code: 500,
			},
		});
	}
};

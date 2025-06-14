import Author from "../models/Author.js";
import Publisher from "../models/Publisher.js";
import Language from "../models/Language.js";

export const transformFilterIdsToTitles = async (req, res) => {
	try {
		const { authorsIds, publishersIds, languagesIds } = req.body;

		if (!authorsIds && !publishersIds && !languagesIds) {
			return res.status(400).json({
				success: false,
				error: {
					message: "No filters provided",
					code: 400,
				},
			});
		}

		if (!authorsIds) {
			authorsIds = [];
		}

		if (!publishersIds) {
			publishersIds = [];
		}

		if (!languagesIds) {
			languagesIds = [];
		}

		const authors = await Author.find({ _id: { $in: authorsIds } });
		const publishers = await Publisher.find({ _id: { $in: publishersIds } });
		const languages = await Language.find({ _id: { $in: languagesIds } });

		const authorsTitles = authors.map((author) => [author._id, author.title]);
		const publishersTitles = publishers.map((publisher) => [
			publisher._id,
			publisher.title,
		]);
		const languagesTitles = languages.map((language) => [
			language._id,
			language.title,
		]);

		res.status(200).json({
			success: true,
			message: "Filter was successfully received!",
			data: {
				authors: authorsTitles,
				publishers: publishersTitles,
				languages: languagesTitles,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: error.message,
				code: 500,
			},
		});
	}
};

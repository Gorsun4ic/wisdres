import Book from "../models/Books.js";
import Author from "../models/Author.js";
import Publisher from "../models/Publisher.js";

export const searchAll = async (req, res) => {
	try {
		const { q: searchTerm } = req.query;

		if (!searchTerm) {
			return res.status(400).json({ error: "Search term is required" });
		}

		// Create a case-insensitive regex pattern
		const searchRegex = new RegExp(searchTerm, "i");

		// Search in all collections simultaneously
		const [books, authors, publishers] = await Promise.all([
			// Search books by title
			Book.find({
				$or: [
					{ "info.title.en": searchRegex },
					{ "info.title.ua": searchRegex },
				],
			})
				.populate("info.author")
				.populate("info.publisher")
				.populate("info.genre")
				.populate("info.language")
				.limit(5),

			// Search authors by name
			Author.find({
				$or: [
					{ "title.en": searchRegex },
					{ "title.ua": searchRegex },
				],
			}).limit(3),

			// Search publishers by name
			Publisher.find({
				title: searchRegex,
			}).limit(3),
		]);

		const lowerTerm = searchTerm.toLowerCase();

		const authorResults = authors.map((author) => ({
			id: author._id,
			title: author.title.en || author.title.ua || "",
			type: "author",
			imageUrl: author.img,
			description: author.about,
		}));

		const publisherResults = publishers.map((publisher) => ({
			id: publisher._id,
			title:
				typeof publisher.title === "object"
					? publisher.title.en || publisher.title.ua
					: publisher.title,
			type: "publisher",
			description: publisher.about,
		}));

		const bookResults = books.map((book) => {
			const enTitle = book.info.title.en || "";
			const uaTitle = book.info.title.ua || "";

			const enMatch = enTitle.toLowerCase().includes(lowerTerm);
			const uaMatch = uaTitle.toLowerCase().includes(lowerTerm);

			let bestTitle = enTitle;
			let bestAuthor = [];
			let bestPublisher = "";

			const imageUrl = enMatch
				? book.info.img?.en || ""
				: book.info.img?.ua || "";

			if (enMatch && !uaMatch) {
				bestTitle = enTitle;
				bestAuthor = (book.info.author || []).map((a) => a.title?.en || "");
				bestPublisher = book.info.publisher?.title?.en || "";
			} else if (uaMatch && !enMatch) {
				bestTitle = uaTitle;
				bestAuthor = (book.info.author || []).map((a) => a.title?.ua || "");
				bestPublisher = book.info.publisher?.title?.ua || "";
			} else if (enMatch && uaMatch) {
				bestTitle = enTitle;
				bestAuthor = (book.info.author || []).map((a) => a.title?.en || "");
				bestPublisher = book.info.publisher?.title?.en || "";
			} else {
				bestTitle = enTitle;
				bestAuthor = (book.info.author || []).map((a) => a.title?.en || "");
				bestPublisher = book.info.publisher?.title?.en || "";
			}

			return {
				id: book._id,
				title: bestTitle,
				type: "book",
				imageUrl,
				author: bestAuthor,
				publisher: bestPublisher,
			};
		});

		const results = [...bookResults, ...authorResults, ...publisherResults];

		res.json({
			success: true,
			message: "Found requested information",
			data: results,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Unfortunately, could not found requested information",
				code: 500,
			},
		});
	}
};

export const searchByGenre = async (req, res) => {
	try {
		const { genre } = req.params;
		const books = await Book.find({ "info.genre": genre })
			.populate("info.author")
			.populate("info.publisher")
			.populate("info.genre")
			.populate("info.language")
			.limit(10);

		res.json({
			success: true,
			message: "Successfully found by genre",
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Unfortunately, could not found requested information",
				code: 500,
			},
		});
	}
};

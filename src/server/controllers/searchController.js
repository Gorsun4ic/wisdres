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
				"info.title": searchRegex,
			})
				.populate("info.author")
				.populate("info.publisher")
				.populate("info.genre")
				.populate("info.language")
				.limit(5),

			// Search authors by name
			Author.find({
				title: searchRegex,
			}).limit(3),

			// Search publishers by name
			Publisher.find({
				title: searchRegex,
			}).limit(3),
		]);

		// Format results with clear type separation
		const results = [
			// Book results
			...books.map((book) => ({
				id: book._id,
				title: book.info.title,
				type: "book",
				imageUrl: book.info.img,
				author: book.info.author?.title, // Get author name if populated
				publisher: book.info.publisher?.title, // Get publisher name if populated
				genre: book.info.genre,
				language: book.info.language,
			})),
			// Author results
			...authors.map((author) => ({
				id: author._id,
				title: author.title,
				type: "author",
				imageUrl: author.img,
				description: author.about,
			})),
			// Publisher results
			...publishers.map((publisher) => ({
				id: publisher._id,
				title: publisher.title,
				type: "publisher",
				description: publisher.about,
			})),
		];

		// Debug logging
		console.log("Search term:", searchTerm);
		console.log("Found books:", books.length);
		console.log("Found authors:", authors.length);
		console.log("Found publishers:", publishers.length);

		res.json(results);
	} catch (error) {
		console.error("Search error:", error);
		res.status(500).json({ error: "Internal server error" });
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

		res.json(books);
	} catch (error) {
		console.error("Genre search error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

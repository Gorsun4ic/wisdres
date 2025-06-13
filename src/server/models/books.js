	import mongoose from "mongoose";

	const BookSchema = new mongoose.Schema({
		info: {
			img: {
				en: String,
				ua: String,
			},
			rating: {
				type: Number,
				default: 0,
			},
			title: {
				en: String,
				ua: String,
			},
			genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
			author: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
			publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
			language: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
			year: Number,
			pages: Number,
			arrived: Date,
			link: {
				en: String,
				ua: String,
			},
		},
		details: {
			book: {
				en: String,
				ua: String,
			},
			auditory: {
				en: String,
				ua: String,
			},
		},
		reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
	});

	const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

	export default Book;

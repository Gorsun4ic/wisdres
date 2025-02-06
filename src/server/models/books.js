	import mongoose from "mongoose";

	const BookSchema = new mongoose.Schema({
		info: {
			img: String,
			rating: Number,
			title: String,
			genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
			author: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
			publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
			language: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
			year: Number,
			pages: Number,
		},
		details: {
			book: String,
			auditory: String,
		},
		reviews: [
			{
				userName: String,
				userEmail: String,
				userRating: Number,
				userText: String,
				date: Date,
			},
		],
	});

	const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

	export default Book;

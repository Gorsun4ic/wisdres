	import mongoose from "mongoose";

	const BookSchema = new mongoose.Schema({
		info: {
			img: String,
			rating: Number,
			title: String,
			genre: [String],
			author: String,
			publisher: String,
			language: String,
			year: Number,
			pages: Number,
		},
		details: {
			book: String,
			auditory: String
		},
		reviews: [
			{
				userName: String,
				userEmail: String,
				userRating: Number,
				userText: String,
				date: Date
			}
		]
	});

	const Book = mongoose.model("Book", BookSchema);

	export default Book;

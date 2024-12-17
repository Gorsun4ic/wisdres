import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
	img: String,
	rating: Number,
	title: String,
	genre: [String],
	author: String,
	publisher: String,
	language: String,
	year: Number,
	pages: Number,
	about: {
		book: String,
		auditory: String,
		author: String
	}
});

const Book = mongoose.model("Book", BookSchema);

export default Book;

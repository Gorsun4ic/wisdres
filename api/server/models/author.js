import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
	img: String,
	title: {
		en: String,
		ua: String,
	},
	about: {
		en: String,
		ua: String,
	},
	bookIds: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }, // References to books
	],
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;

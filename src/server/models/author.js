import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
	img: String,
	title: String,
	about: String
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;

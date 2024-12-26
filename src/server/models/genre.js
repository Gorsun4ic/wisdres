import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
	img: String,
	title: String
});

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;

import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
	img: {
		en: String,
		ua: String,
	},
	title: {
		en: String,
		ua: String,
	},
});

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;

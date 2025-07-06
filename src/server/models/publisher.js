import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
	img: String,
	title: String,
	about: {
		en: String,
		ua: String,
	},
	bookIds: [String],
});

const Publisher = mongoose.model("Publisher", PublisherSchema);

export default Publisher;

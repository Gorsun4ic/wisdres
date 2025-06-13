import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
	title: {
		en: String,
		ua: String,
	},
});

const Language = mongoose.model("Language", LanguageSchema);

export default Language;

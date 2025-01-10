import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
	title: String
});

const Language = mongoose.model("Language", LanguageSchema);

export default Language;

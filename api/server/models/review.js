import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
	book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to Book
	rating: { type: Number, required: true, min: 1, max: 10 },
	text: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;

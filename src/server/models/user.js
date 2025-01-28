import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	lastLogin: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", UserSchema);

export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	lastLogin: {
		type: Date,
		default: Date.now,
	},
	emailVerificationCode: String,
	emailVerificationCodeExpiresAt: {
		type: Date,
	},
	resetPasswordToken: String,
	resetPasswordTokenExpiresAt: {
		type: Date,
	},
});

const User = mongoose.model("User", UserSchema);

export default User;

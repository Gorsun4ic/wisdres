import mongoose from "mongoose";

const ROLES= {
	USER: [
		"view:books",
		"view:authors",
		"view:publishers",
		"view:genres",
		"create:reviews",
		"delete:reviews",
	],
	ADMIN: [
		"view:books",
		"view:authors",
		"view:publishers",
		"view:genres",
		"create:books",
		"edit:books",
		"delete:books",
		"create:authors",
		"edit:authors",
		"delete:authors",
		"create:publishers",
		"edit:publishers",
		"delete:publishers",
		"create:reviews",
		"delete:reviews",
		"manage:users",
		"manage:reviews",
		"view:admin_panel",
	],
	SUPER_ADMIN: [
		"view:books",
		"view:authors",
		"view:publishers",
		"view:genres",
		"create:reviews",
		"delete:reviews",
		"create:genres",
		"edit:genres",
		"delete:genres",
		"create:books",
		"edit:books",
		"delete:books",
		"create:authors",
		"edit:authors",
		"delete:authors",
		"create:publishers",
		"edit:publishers",
		"delete:publishers",
		"create:languages",
		"edit:languages",
		"delete:languages",
		"manage:users",
		"manage:reviews",
		"view:admin_panel",
		"view:admins",
		"manage:admins",
	],
};

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: [String],
		enum: Object.keys(ROLES),
		default: ["USER"],
	},
	lastLogin: {
		type: Date,
		default: Date.now,
	},
	emailVerified: {
		type: Boolean,
		default: false,
	},
	emailVerificationCode: String,
	emailVerificationCodeExpiresAt: Date,
	resetPasswordToken: String,
	resetPasswordTokenExpiresAt: Date,
});

// Export ROLES separately for use in middleware and components
export { ROLES };
export default mongoose.model("User", UserSchema);

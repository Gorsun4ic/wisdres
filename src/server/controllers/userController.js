import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { generateTokenAndSetCookie } from "../utils/generateVerificationCode.js";

import User from "../models/user.js";
import {
	sendVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetEmail,
	sendResetSuccessEmail,
} from "../mailtrap/sendEmails.js";

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json({
			success: true,
			message: "Received all users!",
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch users",
				code: 500,
			},
		});
	}
};

// Get a user by ID
export const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				error: { message: "User not found", code: 404 },
			});
		}
		res.json({
			success: true,
			message: "Found requested user!",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch user",
				code: 500,
			},
		});
	}
};

// Create a new user
export const createUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		if (!email || !password || !username) {
			res.status(400).json({
				success: false,
				error: {
					message: "Some fields are missing. All fields are required!",
					code: 400,
				},
			});
		}

		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			return res.status(400).json({
				success: false,
				error: {
					field: "email",
					message:
						"An account with this email address already exists. Please log in or use a different email to register.",
					code: 400,
				},
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const emailVerificationCode = uuidv4();

		const nextDay = Date.now() + 24 * 60 * 60 * 60 * 1000;

		const user = new User({
			username,
			email,
			password: hashedPassword,
			emailVerificationCode,
			emailVerificationCodeExpiresAt: nextDay,
		});
		await user.save();

		// JWT
		generateTokenAndSetCookie(res, user._id);

		await sendVerificationEmail(
			user.email,
			`${process.env.CLIENT_URL}/email-verification/${user.emailVerificationCode}`
		);

		res.status(201).json({
			success: true,
			message: "User was successfully created!",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: `Failed to add user ${error}`,
				code: 500,
			},
		});
	}
};

// Login function
export const authorizeUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					field: "email",
					message:
						"No account found with this email address. Please check your email or sign up for a new account.",
					code: 400,
				},
			});
		}

		if (user.emailVerificationCode) {
			return res.status(400).json({
				success: false,
				error: {
					field: "email",
					message:
						"First, you have to verify your email. Please, check your email for letter, and follow the instructions.",
					code: 400,
				},
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({
				success: false,
				error: {
					field: "password",
					message: "The password you entered is incorrect. Please try again.",
					code: 400,
				},
			});
		}
		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();

		await user.save();

		res.status(201).json({
			success: true,
			message: "You successfully signed in your account",
			data: {
				user: {
					...user._doc,
					password: undefined,
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to login user",
				code: 500,
			},
		});
	}
};

// Verify user's email token
export const verifyEmail = async (req, res) => {
	const { token } = req.params;
	try {
		const user = await User.findOne({
			emailVerificationCode: token,
			emailVerificationCodeExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					message: "Invalid or expired verification token",
					code: 400,
				},
			});
		}

		user.emailVerificationCode = undefined;
		user.emailVerificationCodeExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.username);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			data: {
				user: {
					...user._doc,
					password: undefined,
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Server error",
				code: 500,
			},
		});
	}
};

// Logout user
export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Check if user authorized in the system
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					message: "User not found",
					code: 400,
				},
			});
		}

		res.status(200).json({
			success: true,
			message: "User is authorized",
			data: user,
			emailVerified: user.emailVerified
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: error.message,
				code: 500,
			},
		});
	}
};

// Send to user email with password reset link
export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					message: "No account associated with this email address.",
					code: 400,
				},
			});
		}

		const resetToken = uuidv4();
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
		user.resetPasswordToken = resetToken;
		user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

		await user.save();

		await sendPasswordResetEmail(
			user.email,
			`${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`
		);
		res.status(200).json({
			success: true,
			message: "A password reset link has been sent to your email address.",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "An unexpected error occurred. Please try again later.",
				code: 500,
			},
		});
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token, password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					message: "Invalid or expired reset link",
					code: 400,
				},
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res
			.status(200)
			.json({ success: true, message: "Password reset successful" });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "An unexpected error occurred. Please try again later.",
				code: 500,
			},
		});
	}
};

// Delete an user by ID
export const deleteUser = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				error: {
					message: "No account associated with this email address.",
					code: 404,
				},
			});
		}

		await User.findByIdAndDelete(user._id);

		return res.status(200).json({
			success: true,
			message: "User account has been deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: { message: "Failed to delete user account", code: 500 },
		});
	}
};

// Update an user by ID
export const updateUser = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				error: {
					message: "User not found",
					code: 404
				},
			});
		}
		res.json({
			success: true,
			message: "User was successfully updated",
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to update user",
				code: 500
			},
		});
	}
};

export const resendVerification = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				success: false,
				error: {
					message: "No account found with this email address.",
					code: 400
				},
			});
		}

		if (!user.emailVerificationCode) {
			return res.status(400).json({
				success: false,
				error: {
					message: "This email is already verified.",
					code: 400
				},
			});
		}

		// Generate new verification code and expiration
		const emailVerificationCode = uuidv4();
		const nextDay = Date.now() + 24 * 60 * 60 * 1000;

		user.emailVerificationCode = emailVerificationCode;
		user.emailVerificationCodeExpiresAt = nextDay;
		await user.save();

		// Send new verification email
		await sendVerificationEmail(
			user.email,
			`${process.env.CLIENT_URL}/email-verification/${user.emailVerificationCode}`
		);

		res.status(200).json({
			success: true,
			message: "A new verification email has been sent.",
		});
	} catch (error) {
		console.error("Error in resendVerification:", error);
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to resend verification email. Please try again later.",
				code: 500
			},
		});
	}
};

import bcrypt from "bcrypt";

import { generateTokenAndSetCookie } from "../utils/generateVerificationCode.js";

import User from "../models/user.js";

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

// Get a user by ID
export const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch user" });
	}
};

// Create a new user
export const createUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		if (!email || !password || !username) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({
				success: false,
				error: {
					field: "email",
					message:
						"An account with this email address already exists. Please log in or use a different email to register.",
				},
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		generateTokenAndSetCookie(res, newUser._id);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: "Failed to add user" });
	}
};

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
				},
			});
		}
		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();

		await user.save();

		res.status(201).json({
			success: true,
			message: "You successfully signed in your account",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(500).send("Failed to login user");
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Delete an user by ID
export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User deleted successfully", user: deletedUser });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete user" });
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
			return res.status(404).json({ error: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: "Failed to update user" });
	}
};

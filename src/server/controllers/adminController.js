import User from "../models/user.js";

export const getAllAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: { $ne: "USER" } });
		res.json(admins);
	} catch (e) {
		res.status(500).json({ error: "Failed to fetch admins" });
	}

};

export const getAdminById = async (req, res) => {
	const { id } = req.params;
	try {
		const admin = await User.findById(id);
		if (!admin) {
			return res.status(404).json({ error: "Admin not found" });
		}
		if (admin.role === "USER") {
			return res.status(403).json({ error: "User is not an admin" });
		}
		res.json(admin);
	} catch (e) {
		res.status(500).json({ error: "Failed to fetch admin" });
	}

};

export const promoteToAdmin = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		if (user.role.some(role => role !== "USER")) {
			return res.status(400).json({ error: `User is already an ${user.role}. Here is user object:`, user });
		}
		user.role = "ADMIN";
		await user.save();
		res.json(user);
	} catch (e) {
		res.status(500).json({ error: `Failed to promote user to admin: ${e.message}` });
	}
}


export const demoteFromAdmin = async (req, res) => {
	const { id } = req.params;
	try {

		const admin = await User.findById(id);
		if (!admin) {
			return res.status(404).json({ error: "Admin not found" });
		}
		if (admin.role === "USER") {
			return res.status(400).json({ error: "User is not an admin" });
		}

		admin.role = "USER";
		await admin.save();
		res.json(admin);
	} catch (e) {
		res.status(500).json({ error: "Failed to demote admin" });
	}
}


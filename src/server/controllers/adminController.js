import User from "../models/user.js";

export const getAllAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: { $ne: "USER" } });
		res.json({
			success: true,
			message: "Received all admins",
			data: admins,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch admins",
				code: 500
			},
		});
	}

};

export const getAdminById = async (req, res) => {
	const { id } = req.params;
	try {
		const admin = await User.findById(id);
		if (!admin) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Admin not found",
					code: 404
				},
			});
		}
		if (admin.role === "USER") {
			return res.status(403).json({
				success: false,
				error: {
					message: "User is not an admin",
					code: 403
				},
			});
		}
		res.json({
			success: true,
			message: "Found requested admin",
			data: admin,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to fetch admin",
				code: 500
			},
		});
	}

};

export const promoteToAdmin = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				error: {
					message: "User not found",
					code: 404
				},
			});
		}
		if (user.role.some(role => role !== "USER")) {
			return res.status(400).json({
				success: false,
				error: {
					message: `User is already an ${user.role}.`,
					code: 400
				},
			});
		}
		user.role = "ADMIN";
		await user.save();
		res.json({
			success: true,
			message: "User was successfully promoted to admin!",
			data: user
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: {
				message: `Failed to promote user to admin: ${e.message}`,
				code: 500
			},
		});
	}
}

export const demoteFromAdmin = async (req, res) => {
	const { id } = req.params;
	try {
		const admin = await User.findById(id);
		if (!admin) {
			return res.status(404).json({
				success: false,
				error: {
					message: "Admin not found",
					code: 404
				},
			});
		}
		if (admin.role === "USER") {
			return res.status(400).json({
				success: false,
				error: {
					message: "User is not an admin",
					code: 400
				},
			});
		}

		admin.role = "USER";
		await admin.save();

		res.json({
			success: true,
			message: "Admin was successfully demoted to a regular user!",
			data: admin,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: {
				message: "Failed to demote admin",
				code: 500
			},
		});
	}
}


export const PERMISSIONS = {
	CREATE_BOOK: "create_book",
	EDIT_BOOK: "edit_book",
	DELETE_BOOK: "delete_book",
	CREATE_AUTHOR: "create_author",
	EDIT_AUTHOR: "edit_author",
	DELETE_AUTHOR: "delete_author",
	CREATE_PUBLISHER: "create_publisher",
	EDIT_PUBLISHER: "edit_publisher",
	DELETE_PUBLISHER: "delete_publisher",
	CREATE_GENRE: "create_genre",
	EDIT_GENRE: "edit_genre",
	DELETE_GENRE: "delete_genre",
	CREATE_LANGUAGE: "create_language",
	EDIT_LANGUAGE: "edit_language",
	DELETE_LANGUAGE: "delete_language",
	ADD_ADMIN: "add_admin",
	EDIT_ADMIN_ROLE: "edit_admin_role",
	EDIT_ADMIN_PERMISSIONS: "edit_admin_permissions",
	DELETE_ADMIN: "delete_admin",
	MANAGE_USERS: "manage_users",
	MANAGE_REVIEWS: "manage_reviews",
	VIEW_ANALYTICS: "view_analytics",


};

export const requirePermission = (requiredPermissions = []) => {
	return (req, res, next) => {
		try {
			const userPermissions = req.user.permissions || [];

			const hasPermission = requiredPermissions.every((permission) =>
				userPermissions.includes(permission)
			);

			if (!hasPermission) {
				return res.status(403).json({
					error: "You do not have the required permissions",
				});
			}

			next();
		} catch (error) {
			res.status(403).json({ error: "Permission check failed" });
		}
	};
};

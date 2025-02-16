import User from "../server/models/user.js";
import { ROLES } from "../server/models/user.js";

function hasPermission(user: User, permission: string) {

	if (!user || !permission) return false;;

	const userRoles = user.role.some((role: string) => ROLES[role]?.includes(permission))
	return userRoles || false;
}

export default hasPermission;
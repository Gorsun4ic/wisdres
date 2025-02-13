import User from "../server/models/user.js";
import { ROLES } from "../server/models/user.js";

function hasPermission(user: User, permission: string) {

	if (!user || !permission) return false;
	
	return ROLES[user.role]?.includes(permission) || false;
}

export default hasPermission;
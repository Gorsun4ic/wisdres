import { IUser, RoleKey } from "@src/types/user";
import { ROLES } from "@src/server/models/user.js";

function hasPermission(user: IUser, permission: string) {

	if (!user || !permission) return false;;

	const userRoles = user.role.some((role: string) => ROLES[role as RoleKey]?.includes(permission))
	return userRoles || false;
}

export default hasPermission;
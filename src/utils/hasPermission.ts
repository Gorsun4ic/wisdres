import { IUser, RoleKey } from "@src/types/user";
import { ROLES } from "@server/models/user.js";

function hasPermission(user: IUser, permission: string) {

	if (!user || !permission) return false;;

	return (user.role as string[]).some((role: string) => ROLES[role as RoleKey]?.includes(permission));
}

export default hasPermission;
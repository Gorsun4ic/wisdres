import { useSelector } from "react-redux";
import { UserRoles, RoleHierarchy, type UserRole } from "../types/roles";

export function useAuth() {
	const user = useSelector((state) => state.auth.user);

	const hasRole = (role: UserRole) => user?.role === role;

	const hasRoleOrHigher = (role: UserRole) => {
		if (!user) return false;
		return RoleHierarchy[user.role] >= RoleHierarchy[role];
	};

	const isAdmin = () => hasRoleOrHigher(UserRoles.ADMIN);
	const isSuperAdmin = () => hasRole(UserRoles.SUPER_ADMIN);

	return {
		user,
		isAdmin,
		isSuperAdmin,
		hasRole,
		hasRoleOrHigher,
	};
}

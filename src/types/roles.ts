export const UserRoles = {
	USER: "user",
	ADMIN: "admin",
	SUPER_ADMIN: "super_admin",
} as const;

export const RoleHierarchy = {
	[UserRoles.SUPER_ADMIN]: 3,
	[UserRoles.ADMIN]: 2,
	[UserRoles.USER]: 1,
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

// MUI
import RecentActorsIcon from "@mui/icons-material/RecentActors";

// API
import { useDeleteUserMutation, useGetUsersQuery, apiUsersSlice } from "@api/apiUsersSlice";
import { usePromoteToAdminMutation, apiAdminsSlice } from "@api/apiAdminsSlice";

// Types
import { AdminConfig, InferHook } from "@custom-types/adminFormConfig";

export type UserMutations = {
	delete: InferHook<typeof apiUsersSlice, "deleteUser", "useMutation">;
	getAll: InferHook<typeof apiUsersSlice, "getUsers", "useQuery">;
	changeUserStatus: InferHook<typeof apiAdminsSlice, "promoteToAdmin", "useMutation">;
};

export const usersConfig: AdminConfig<UserMutations> = {
	entityName: "users",
	icon: <RecentActorsIcon />,
	columns: [
		{
			field: "username",
			headerName: "Username",
			width: 150,
		},
		{
			field: "email",
			headerName: "Email",
			width: 150,
		},
		{
			field: "lastLogin",
			headerName: "Last login",
			width: 150,
		},
	],
	successChangeUserStatus: "User successfully promoted to admin",
	failChangeUserStatus: "Failed to promote user",
	mutations: {
		delete: useDeleteUserMutation,
		getAll: useGetUsersQuery,
		changeUserStatus: usePromoteToAdminMutation,
	},
};

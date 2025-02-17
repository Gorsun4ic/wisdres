import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "@api/apiUsersSlice";

import { usePromoteToAdminMutation } from "@api/apiAdminsSlice";

export const usersConfig: AdminConfig = {
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

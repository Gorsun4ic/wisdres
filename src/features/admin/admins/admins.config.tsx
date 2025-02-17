import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { AdminConfig } from "@custom-types/adminFormConfig";

import { useDeleteUserMutation } from "@api/apiUsersSlice";

import { useDemoteFromAdminMutation, useGetAllAdminsQuery } from "@api/apiAdminsSlice";

export const adminsConfig: AdminConfig = {
	entityName: "admins",
	icon: <AdminPanelSettingsIcon />,
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
	successChangeUserStatus: "User successfully demoted to user",
	failChangeUserStatus: "Failed to demote user",
	mutations: {
		delete: useDeleteUserMutation,
		getAll: useGetAllAdminsQuery,
		changeUserStatus: useDemoteFromAdminMutation,
	},
};

// MUI
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// API 
import { useDemoteFromAdminMutation, useGetAllAdminsQuery, apiAdminsSlice } from "@api/apiAdminsSlice";
import { useDeleteUserMutation, apiUsersSlice } from "@api/apiUsersSlice";

// Types
import { AdminConfig, InferHook } from "@custom-types/adminFormConfig";

export type AdminMutations = {
	delete: InferHook<typeof apiUsersSlice, "deleteUser", "useMutation">;
	getAll: InferHook<typeof apiAdminsSlice, "getAllAdmins", "useQuery">;
	changeUserStatus: InferHook<typeof apiAdminsSlice, "demoteFromAdmin", "useMutation">;
}


export const adminsConfig: AdminConfig<AdminMutations> = {
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

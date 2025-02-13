import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
	useGetAdminsQuery,
	useUpdateUserRoleMutation,
	useDeleteUserMutation,
} from "../../../store/api/userApi";
import { UserRoles } from "../../../types/roles";
import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { AddAdminDialog } from "./add-admin-dialog";

export function AdminManagement() {
	const { data: admins, isLoading } = useGetAdminsQuery();
	const [updateRole] = useUpdateUserRoleMutation();
	const [deleteUser] = useDeleteUserMutation();
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

	const columns: GridColDef[] = [
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "name", headerName: "Name", flex: 1 },
		{
			field: "role",
			headerName: "Role",
			flex: 1,
			renderCell: (params) => (
				<Button
					variant="outlined"
					onClick={() => handleRoleChange(params.row.id)}
					color={params.row.role === UserRoles.ADMIN ? "primary" : "secondary"}>
					{params.row.role === UserRoles.ADMIN
						? "Demote to User"
						: "Promote to Admin"}
				</Button>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 1,
			renderCell: (params) => (
				<Button
					variant="outlined"
					color="error"
					onClick={() => handleDelete(params.row.id)}>
					Delete
				</Button>
			),
		},
	];

	const handleRoleChange = async (userId: string) => {
		const admin = admins?.find((a) => a.id === userId);
		if (!admin) return;

		const newRole =
			admin.role === UserRoles.ADMIN ? UserRoles.USER : UserRoles.ADMIN;
		await updateRole({ userId, role: newRole });
	};

	const handleDelete = async (userId: string) => {
		if (window.confirm("Are you sure you want to delete this admin?")) {
			await deleteUser(userId);
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
				<Typography variant="h5">Manage Admins</Typography>
				<Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
					Add New Admin
				</Button>
			</Box>

			<DataGrid
				rows={admins || []}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
			/>

			<AddAdminDialog
				open={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
			/>
		</Box>
	);
}

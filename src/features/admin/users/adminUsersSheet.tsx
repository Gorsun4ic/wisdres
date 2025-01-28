import { useSelector } from "react-redux";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Alert from "@mui/material/Alert";

import { RootState } from "@store/index";

import { useGetUsersQuery, useDeleteUserMutation } from "@api/apiUsersSlice";

import AdminGrid from "@features/admin/grid-data";

import ErrorMessage from "@components/error";

import { StyledAdminUsersSheet } from "./style";

const AdminUsersSheet = () => {
	const { data, isLoading, error } = useGetUsersQuery(null);
	const [deletePublisher] = useDeleteUserMutation();
	const { alert } = useSelector((state: RootState) => state.alert);

	const gridColumns: GridColDef[] = [
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
	];

	return (
		<StyledAdminUsersSheet>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<RecentActorsIcon fontSize="large" />
					<p>Publishers</p>
				</Stack>
			</Stack>
			<ErrorBoundary fallback={<ErrorMessage />}>
				<AdminGrid
					data={data}
					isLoading={isLoading}
					error={error}
					deleteMethod={deletePublisher}
					columns={gridColumns}
				/>
			</ErrorBoundary>
			{alert && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminUsersSheet>
	);
};

export default AdminUsersSheet;

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
	Stack,
	Tooltip,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Alert,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { RootState } from "@store/index";

import { useGetUsersQuery, useDeleteUserMutation } from "@api/apiUsersSlice";
import { usePromoteToAdminMutation } from "@api/apiAdminsSlice";

import AdminGrid from "@features/admin/grid-data";

import ErrorMessage from "@components/error";
import Button from "@components/button";

import { StyledAdminUsersSheet } from "./style";

const AdminUsersSheet = () => {
	const { data, isLoading, error } = useGetUsersQuery(null);
	const [deleteUser] = useDeleteUserMutation();
	const [promoteUser, { isLoading: isPromoting, error: promoteError }] =
		usePromoteToAdminMutation();
	const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false);
	const [promoteUserId, setPromoteUserId] = useState<string | null>(null);
	const [promoteStatus, setPromoteStatus] = useState<{
		show: boolean;
		message: string;
		severity: "success" | "error";
	}>({ show: false, message: "", severity: "success" });
	const { alert } = useSelector((state: RootState) => state.alert);
	useEffect(() => {
		console.log(promoteError);
	}, [promoteError]);

	const handlePromote = async () => {
		try {
			promoteUser(promoteUserId);
			setIsPromoteDialogOpen(false);
			setPromoteStatus({
				show: true,
				message: "User successfully promoted to admin",
				severity: "success",
			});
		} catch (err) {
			console.log(err);
			setPromoteStatus({
				show: true,
				message: promoteError?.data?.error || "Failed to promote user",
				severity: "error",
			});
		}
	};

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
		{
			field: "promote",
			headerName: "Promote",
			width: 80,
			renderCell: (params) => (
				<Tooltip title="Promote to admin">
					<IconButton
						color="primary"
						onClick={() => {
							setIsPromoteDialogOpen(true);
							setPromoteUserId(params.row.id);
						}} // Pass the row data
					>
						<KeyboardDoubleArrowUpIcon color="success" />
					</IconButton>
				</Tooltip>
			),
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
					<p>Users</p>
				</Stack>
			</Stack>
			<ErrorBoundary fallback={<ErrorMessage />}>
				<AdminGrid
					data={data}
					isLoading={isLoading}
					error={error}
					deleteMethod={deleteUser}
					columns={gridColumns}
				/>
				<Dialog
					open={isPromoteDialogOpen}
					onClose={() => setIsPromoteDialogOpen(false)}>
					<DialogTitle>Confirm Promotion</DialogTitle>
					<DialogContent>
						<Stack spacing={2}>
							<p>Are you sure you want to promote this user to admin?</p>
							{promoteStatus.show && promoteStatus.severity === "error" && (
								<Alert severity="error">{promoteStatus.message}</Alert>
							)}
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							onClick={() => setIsPromoteDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={handlePromote}
							isLoading={isPromoting}>
							Promote
						</Button>
					</DialogActions>
				</Dialog>
			</ErrorBoundary>
			{promoteStatus.show && promoteStatus.severity === "success" && (
				<Alert
					severity="success"
					sx={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 2000,
						minWidth: "300px",
						boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
					}}>
					{promoteStatus.message}
				</Alert>
			)}
		</StyledAdminUsersSheet>
	);
};

export default AdminUsersSheet;

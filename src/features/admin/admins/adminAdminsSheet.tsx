import { useState } from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { Stack, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import Alert from "@mui/material/Alert";

import { RootState } from "@store/index";

import { useGetAllAdminsQuery, useDemoteFromAdminMutation } from "@api/apiAdminsSlice";

import hasPermission from "@utils/hasPermission";

import AdminGrid from "@features/admin/grid-data";

import ErrorMessage from "@components/error";
import Button from "@components/button";



const AdminAdminsSheet = () => {
	const { data, isLoading, error } = useGetAllAdminsQuery(null);
	const [demoteAdmin, { isLoading: isDemoting, error: demoteError }] = useDemoteFromAdminMutation();
		const [isDemoteDialogOpen, setIsDemoteDialogOpen] = useState(false);
		const [demoteUserId, setDemoteUserId] = useState<string | null>(null);
		const [demoteStatus, setDemoteStatus] = useState<{
			show: boolean;
			message: string;
			severity: "success" | "error";
		}>({ show: false, message: "", severity: "success" });

	const { alert } = useSelector((state: RootState) => state.alert);

		const handleDemote = async () => {
			try {
				setIsDemoteDialogOpen(false);
				demoteAdmin(demoteUserId);
				setDemoteStatus({
					show: true,
					message: "User successfully demoted from admin",
					severity: "success",
				});
			} catch (err) {
				setDemoteStatus({
					show: true,
					message: demoteError?.data?.error || "Failed to demote user",
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
		{ field: "role", headerName: "Role", width: 150 },
		{
			field: "promote",
			headerName: "Promote",
			width: 80,
			renderCell: (params) => (
				<Tooltip title="Demote from admin">
					<IconButton
						color="primary"
						onClick={() => {
							setIsDemoteDialogOpen(true);
							setDemoteUserId(params.row.id);
						}} // Pass the row data
					>

						<KeyboardDoubleArrowDownIcon color="success" />
					</IconButton>
				</Tooltip>
			),
		},
	];

	return (
		<>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<AdminPanelSettingsIcon fontSize="large" />
					<p>Admins</p>
				</Stack>
			</Stack>

			<ErrorBoundary fallback={<ErrorMessage />}>
				<AdminGrid
					data={data}
					isLoading={isLoading}
					error={error}
					columnVisibilityModel={{
						username: !hasPermission(data?.user, "manage:admins"),
					}}
					columns={gridColumns}
				/>
				<Dialog
					open={isDemoteDialogOpen}
					onClose={() => setIsDemoteDialogOpen(false)}>
					<DialogTitle>Confirm Demotion</DialogTitle>
					<DialogContent>

						<Stack spacing={2}>
							<p>Are you sure you want to demote this user from admin?</p>
							{demoteStatus.show && demoteStatus.severity === "error" && (
								<Alert severity="error">{demoteStatus.message}</Alert>
							)}
						</Stack>

					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							onClick={() => setIsDemoteDialogOpen(false)}>
							Cancel
						</Button>
						<Button

							variant="primary"
							onClick={handleDemote}
							isLoading={isDemoting}>
							Demote
						</Button>

					</DialogActions>
				</Dialog>
			</ErrorBoundary>
			{demoteStatus.show && demoteStatus.severity === "success" && (
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
					{demoteStatus.message}
				</Alert>
			)}

		</>
	);
};

export default AdminAdminsSheet;

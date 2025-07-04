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

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { useCheckAuthQuery } from "@api/apiUsersSlice";

import { usersConfig } from "./users.config";

import { useAdminSheet } from "@hooks/useAdminSheet";
import { useChangeUserStatus } from "@hooks/useChangeUserStatus";

import hasPermission from "@utils/hasPermission";
import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import GridData from "../grid";

import ErrorMessage from "@components/error";
import Button from "@components/button/Button";

const UsersSheet = () => {
	const { data: userData } = useCheckAuthQuery();

	const { data, isLoading, error, handleDelete } = useAdminSheet(usersConfig);

	const {
		isChangeDialogOpen,
		setIsChangeDialogOpen,
		setChangeUserId,
		changeStatus,
		handleChange,
		isChanging,
	} = useChangeUserStatus(usersConfig);

	const gridColumns: GridColDef[] = [
		{
			field: "promote",
			headerName: "Promote",
			width: 80,
			renderCell: (params) => (
				<Tooltip title="Promote to admin">
					<IconButton
						color="primary"
						onClick={() => {
							setIsChangeDialogOpen(true);
							setChangeUserId(params.row.id);
						}}>
						<KeyboardDoubleArrowUpIcon color="success" />
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
					{usersConfig.icon}
					<p>{upperCaseFirstLetter(usersConfig.entityName)}</p>
				</Stack>
			</Stack>
			<ErrorBoundary fallback={<ErrorMessage />}>
				<GridData
					data={data?.data}
					isLoading={isLoading}
					error={error}
					onDelete={handleDelete}
					columns={[
						...usersConfig.columns,
						...(hasPermission(userData?.user, "manage:admins")
							? gridColumns
							: []),
					]}
				/>
				<Dialog
					open={isChangeDialogOpen}
					onClose={() => setIsChangeDialogOpen(false)}>
					<DialogTitle>Confirm Promotion</DialogTitle>
					<DialogContent>
						<Stack spacing={2}>
							<p>Are you sure you want to promote this user to admin?</p>
							{changeStatus.show && changeStatus.severity === "error" && (
								<Alert severity="error">{changeStatus.message}</Alert>
							)}
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setIsChangeDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleChange}>
							Promote
						</Button>
					</DialogActions>
				</Dialog>
			</ErrorBoundary>
			{changeStatus.show && (
				<Alert
					severity={changeStatus.severity}
					sx={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 2000,
						minWidth: "300px",
						boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
					}}>
					{changeStatus.message}
				</Alert>
			)}
		</>
	);
};

export default UsersSheet;

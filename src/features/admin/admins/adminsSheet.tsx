import { useEffect } from "react";
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

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useCheckAuthQuery } from "@api/apiUsersSlice";

import { adminsConfig } from "./admins.config";

import { useAdminSheet } from "@hooks/useAdminSheet";
import { useChangeUserStatus } from "@hooks/useChangeUserStatus";

import hasPermission from "@utils/hasPermission";
import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import GridData from "../grid";

import ErrorMessage from "@components/error";
import Button from "@components/button";


const AdminsSheet = () => {
	const { data: userData } = useCheckAuthQuery(null);

	const { data, isLoading, error, handleDelete } =
		useAdminSheet(adminsConfig);

	const {
		isChangeDialogOpen,
		setIsChangeDialogOpen,
		setChangeUserId,
		changeStatus,
		handleChange,
		isChanging,
	} = useChangeUserStatus(adminsConfig);

	const gridColumns: GridColDef[] = [
		{
			field: "demote",
			headerName: "Demote",
			width: 80,
			renderCell: (params) => (
				<Tooltip title="Demote to user">
					<IconButton
						color="primary"
						onClick={() => {
							setIsChangeDialogOpen(true);
							setChangeUserId(params.row.id);
						}} // Pass the row data
					>
						<KeyboardDoubleArrowDownIcon color="error" />
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
					{adminsConfig.icon}
					<p>{upperCaseFirstLetter(adminsConfig.entityName)}</p>
				</Stack>
			</Stack>
			<ErrorBoundary fallback={<ErrorMessage />}>
				<GridData
					data={data}
					isLoading={isLoading}
					error={error}
					onDelete={handleDelete}
					columns={[
						...adminsConfig.columns,
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
							variant="outlined"
							onClick={() => setIsChangeDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={handleChange}
							isLoading={isChanging}>
							Promote
						</Button>
					</DialogActions>
				</Dialog>
			</ErrorBoundary>
			{changeStatus.show && changeStatus.severity === "success" && (
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
					{changeStatus.message}
				</Alert>
			)}
		</>
	);
};

export default AdminsSheet;

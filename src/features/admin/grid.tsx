import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAdminGrid } from "@hooks/useAdminGrid";
import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

interface AdminGridProps<T> {
	handleEdit?: (mode: "add" | "edit", id?: string) => void;
	isLoading: boolean;
	columns: GridColDef[];
	data: T[];
	onDelete: (id: string, title: string) => Promise<void>;
	deleteButton?: boolean;
	changeButton?: boolean;
	error: unknown;
	columnVisibilityModel?: GridColDef[];
}

const GridData = <T extends { _id: string; info?: { title: string } }> ({
	handleEdit,
	data,
	isLoading,
	error,
	onDelete,
	columns,
	deleteButton,
	changeButton,
	columnVisibilityModel,
}: AdminGridProps<T>) => {
	const {
		items,
		selectedItem,
		openDialog,
		handleDeleteDialog,
		handleDialogAction,
	} = useAdminGrid({
		data,
		onDelete,
	});

	if (isLoading)
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	if (error) return <ErrorMessage />;

	const deleteColumn: GridColDef[] = [
		{
			field: "delete",
			headerName: "Delete",
			width: 60,
			renderCell: (params) => (
				<Tooltip title="Delete">
					<IconButton
						color="primary"
						onClick={() => handleDeleteDialog(params.row)}>
						<DeleteIcon color="error" />
					</IconButton>
				</Tooltip>
			),
		},
	];

	const changeColumn: GridColDef[] = [
		{
			field: "change",
			headerName: "Change",
			width: 70,
			renderCell: (params) => (
				<Tooltip title="Change">
					<IconButton
						color="primary"
						onClick={() => handleEdit?.("edit", params.row._id)}>
						<EditIcon color="warning" />
					</IconButton>
				</Tooltip>
			),
		},
	];

	return (
		<>
			<DataGrid
				rows={items}
				columns={[
					...columns,
					...(deleteButton ? deleteColumn : []),
					...(changeButton ? changeColumn : []),
				]}
				columnVisibilityModel={columnVisibilityModel}
				initialState={{
					pagination: { paginationModel: { pageSize: 15 } },
				}}
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: { showQuickFilter: true },
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>

			{openDialog && selectedItem && (
				<ConfirmAction
					title={`Delete ${selectedItem.title}?`}
					openDialog={openDialog}
					onConfirm={() => handleDialogAction(true)}
					onCancel={() => handleDialogAction(false)}
				/>
			)}
		</>
	);
}

export default GridData;

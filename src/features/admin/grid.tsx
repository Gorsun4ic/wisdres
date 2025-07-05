import { DataGrid, GridToolbar, GridColDef, GridColumnVisibilityModel} from "@mui/x-data-grid";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Hooks
import { useAdminGrid } from "@hooks/useAdminGrid";

// Custom components
import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

// Utils
import { getLangEntity } from "@src/utils/getLangEntity";

// Get the language
import { useTranslation } from "react-i18next";
import { LangType } from "@src/i18n";

interface AdminGridProps<T extends {_id: string}> {
	handleEdit?: (mode: "add" | "edit", id?: string) => void;
	isLoading: boolean;
	columns: GridColDef[];
	data: T[];
	onDelete: (id: string, title: string) => Promise<void>;
	deleteButton?: boolean;
	changeButton?: boolean;
	error: unknown;
	columnVisibilityModel?: GridColumnVisibilityModel;
}

const GridData = <T extends { _id: string, title: {en: string, ua: string}}>({
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

	const { i18n } = useTranslation();
	const lang = i18n.language as LangType;

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
				pageSizeOptions={[15]}
			/>

			{openDialog && selectedItem && (
				<ConfirmAction
					title={`Delete ${getLangEntity(selectedItem.title, lang)}?`}
					openDialog={openDialog}
					onConfirm={() => handleDialogAction(true)}
					onCancel={() => handleDialogAction(false)}
				/>
			)}
		</>
	);
};

export default GridData;

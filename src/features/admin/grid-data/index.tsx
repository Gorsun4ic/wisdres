import { useState, useEffect } from "react";

import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useAlert from "@hooks/useAlert";

import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

import { IBookInfo } from "@custom-types/book";

const AdminGrid = ({
	handleEdit,
	data,
	isLoading,
	error,
	deleteMethod,
	columns
}: {
	handleEdit: (mode: "add" | "edit", id?: string) => void;
}) => {
	const [info, setInfo] = useState<IBookInfo[] | []>([]);
	const [selectedInfo, setSelectedInfo] = useState<null | IBookInfo>(null); // Stores selected book for delete dialog
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const triggerAlert = useAlert();

	// Effect to update books when data from the API changes
	useEffect(() => {
		if (data) {
			const correctData = handleId(data);
			setInfo(correctData);
		}
	}, [data]);

	// Open delete confirmation dialog
	const openDeleteDialog = (rowData: IBookInfo) => {
		setSelectedInfo(rowData);
		setOpenDialog(true);
	};

	// Handle dialog actions
	const handleDialogAction = (confirm: boolean) => {
		if (confirm && selectedInfo?.id) {
			deleteMethod(selectedInfo.id); // Trigger API call to delete the book
			setInfo((prev) => prev.filter((book) => book?.id !== selectedInfo?.id)); // Optimistic UI update
			triggerAlert({
				title: `The ${selectedInfo?.title} was successfully deleted`,
				color: "success",
			});
		}
		setOpenDialog(false);
		setTimeout(() => {
			setSelectedInfo(null); // Clear selection
		}, 2000);
	};
	// Handle change/edit click
	const handleChangeClick = (rowData: IBookInfo) => {
		console.log("Row data:", rowData); // Do something with the row data
		handleEdit("edit", rowData?.id);
	};

	const handleId = (data: IBookInfo[]) => {
		return data.map((item: IBookInfo) => {
			return {
				id: item._id,
				...item,
			};
		});
	};

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	// Columns definition (must come after handler functions)
	const columnsInfo: GridColDef[] = [
		{ field: "_id", headerName: "ID", width: 90 },
		...columns,
		{
			field: "delete",
			headerName: "Delete",
			width: 60,
			renderCell: (params) => (
				<Tooltip title="Delete">
					<IconButton
						color="primary"
						onClick={() => openDeleteDialog(params.row)} // Pass the row data
					>
						<DeleteIcon color="error" />
					</IconButton>
				</Tooltip>
			),
		},
		{
			field: "change",
			headerName: "Change",
			width: 70,
			renderCell: (params) => (
				<Tooltip title="Change">
					<IconButton
						color="primary"
						onClick={() => handleChangeClick(params.row)} // Pass the row data
					>
						<EditIcon color="warning" />
					</IconButton>
				</Tooltip>
			),
		},
	];

	return (
		<>
			<DataGrid
				rows={info}
				columns={columnsInfo}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 15,
						},
					},
				}}
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
			{openDialog && (
				<ConfirmAction
					title={`Delete the book ${info?.title}`}
					openDialog={openDialog}
					onConfirm={handleDialogAction}
					onCancel={() => handleDialogAction(false)}
				/>
			)}
		</>
	);
};

export default AdminGrid;

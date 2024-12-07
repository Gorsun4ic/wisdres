import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetBooksQuery, useDeleteBookMutation } from "@api/apiBooksSlice";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDelete = ({ title, openDialog, onConfirm, onCancel }) => (
	<Dialog
		open={openDialog}
		onClose={onCancel}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description">
		<DialogTitle id="alert-dialog-title">
			{`Delete the book "${title}"?`}
		</DialogTitle>
		<DialogActions>
			<Button onClick={() => onConfirm(true)} color="error">
				Yes
			</Button>
			<Button onClick={() => onConfirm(false)} autoFocus>
				No
			</Button>
		</DialogActions>
	</Dialog>
);

const AdminBooksGrid = () => {
	const { data, error, isLoading } = useGetBooksQuery();
	const [deleteBook] = useDeleteBookMutation();
	const [books, setBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null); // Stores selected book for delete dialog
	const [openDialog, setOpenDialog] = useState(false);
	const [alertMessage, setAlertMessage] = useState(false);

	// Effect to update books when data from the API changes
	useEffect(() => {
		if (data) {
			setBooks(data);
		}
	}, [data]);

	// Open delete confirmation dialog
	const openDeleteDialog = (rowData) => {
		setSelectedBook(rowData);-
		setOpenDialog(true);
	};

	// Handle dialog actions
	const handleDialogAction = (confirm) => {
		if (confirm && selectedBook) {
			deleteBook(selectedBook.id); // Trigger API call to delete the book
			setBooks((prev) => prev.filter((book) => book.id !== selectedBook.id)); // Optimistic UI update
			setAlertMessage(true);
			setTimeout(() => {
				setAlertMessage(false);
			}, 2000);
		}
		setOpenDialog(false);
		setTimeout(() => {
			setSelectedBook(null); // Clear selection
		}, 2000);
	};
	// Handle change/edit click
	const handleChangeClick = (rowData) => {
		console.log("Row data:", rowData); // Do something with the row data
	};

	// Columns definition (must come after handler functions)
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params) => <img src={params.value} width="40" />,
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
		},
		{
			field: "author",
			headerName: "Author",
			width: 150,
		},
		{
			field: "publisher",
			headerName: "Publisher",
			width: 150,
		},
		{
			field: "genre",
			headerName: "Genres",
			width: 150,
		},
		{
			field: "language",
			headerName: "Language",
			width: 80,
		},
		{
			field: "year",
			headerName: "Year",
			width: 60,
			type: "number",
		},
		{
			field: "pages",
			headerName: "Pages",
			width: 60,
			type: "number",
		},
		{
			field: "reviews",
			headerName: "Reviews",
			width: 80,
			type: "number",
		},
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

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<DataGrid
				rows={books}
				columns={columns}
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
				<ConfirmDelete
					title={selectedBook?.title || ""}
					openDialog={openDialog}
					onConfirm={handleDialogAction}
					onCancel={() => handleDialogAction(false)}
				/>
			)}
			{alertMessage && (
				<Alert severity="error">
					Book {selectedBook?.title} was successfully deleted
				</Alert>
			)}
		</>
	);
};

export default AdminBooksGrid;

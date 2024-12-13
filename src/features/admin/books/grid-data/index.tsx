import { useState, useEffect } from "react";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetBooksQuery, useDeleteBookMutation } from "@api/apiBooksSlice";
import { useAlert } from "@hooks/useAlert";

import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

import { IBookInfo } from "@custom-types/book";

const AdminBooksGrid = ({
	handleEdit,
}: {
	handleEdit: (mode: "add" | "edit", id?: string) => void;
}) => {
	const { data, isLoading, error } = useGetBooksQuery(null);
	const [deleteBook] = useDeleteBookMutation();
	const [books, setBooks] = useState<IBookInfo[] | []>([]);
	const [selectedBook, setSelectedBook] = useState<null | IBookInfo>(null); // Stores selected book for delete dialog
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const triggerAlert = useAlert();

	// Effect to update books when data from the API changes
	useEffect(() => {
		if (data) {
			const correctData = handleId(data);
			setBooks(correctData);
		}
	}, [data]);


	// Open delete confirmation dialog
	const openDeleteDialog = (rowData: IBookInfo) => {
		setSelectedBook(rowData);
		setOpenDialog(true);
	};

	// Handle dialog actions
	const handleDialogAction = (confirm: boolean) => {
		if (confirm && selectedBook?.id) {
			deleteBook(selectedBook.id); // Trigger API call to delete the book
			setBooks((prev) => prev.filter((book) => book?.id !== selectedBook?.id)); // Optimistic UI update
			triggerAlert({
				title: `The book ${selectedBook?.title} was successfully deleted`,
				color: "success",
			});
		}
		setOpenDialog(false);
		setTimeout(() => {
			setSelectedBook(null); // Clear selection
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

	// Columns definition (must come after handler functions)
	const columns: GridColDef[] = [
		{ field: "_id", headerName: "ID", width: 90 },
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

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

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
				<ConfirmAction
					title={`Delete the book ${selectedBook?.title}`}
					openDialog={openDialog}
					onConfirm={handleDialogAction}
					onCancel={() => handleDialogAction(false)}
				/>
			)}
		</>
	);
};

export default AdminBooksGrid;

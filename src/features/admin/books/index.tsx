import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Alert from "@mui/material/Alert";

import { useGetBooksQuery, useDeleteBookMutation } from "@api/apiBooksSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

import { IBookInfo } from "@custom-types/book";

import useShowAuthorsName from "@hooks/useShowAuthorsName";

import AdminGrid from "../grid-data";
import AdminBookForm from "./book-form";
import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminBooks } from "./style";

const AdminBooks = () => {
	const { data: booksData, isLoading, error } = useGetBooksQuery();
	const [bookToEditId, setBookToEditId] = useState<string | null>(null);
	const [deleteBook] = useDeleteBookMutation();
	const { data: authorsData } = useGetAuthorsQuery(null);
	const { alert } = useSelector((state: RootState) => state.alert);
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [data, setData] = useState<IBookInfo[]>();
	const { getAuthorsNameArr } = useShowAuthorsName();

	useEffect(() => {
		if (booksData) {
			const correctData = getAuthorsNameArr({
				booksData,
				authorsData,
			});
			console.log(correctData)
			setData(correctData);
		}
	}, [booksData, authorsData]);

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setBookToEditId(id);
	};

	const handleClose = () => setOpen(false);

	const gridColumns: GridColDef[] = [
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
	];

	return (
		<StyledAdminBooks>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<LibraryBooksIcon fontSize="large" />
					<p>Books</p>
				</Stack>
				<Button size="small" onClick={() => handleOpen("add")}>
					Add a new book
				</Button>
				<ErrorBoundary fallback={<ErrorMessage />}>
					<Modal open={open} onClose={handleClose}>
						<AdminBookForm
							mode={formMode}
							bookId={bookToEditId}
							openModal={setOpen}
						/>
					</Modal>
				</ErrorBoundary>
			</Stack>
			<ErrorBoundary fallback={<ErrorMessage />}>
				<AdminGrid
					handleEdit={handleOpen}
					data={data}
					isLoading={isLoading}
					error={error}
					deleteMethod={deleteBook}
					columns={gridColumns}
				/>
			</ErrorBoundary>
			{alert && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminBooks>
	);
};

export default AdminBooks;

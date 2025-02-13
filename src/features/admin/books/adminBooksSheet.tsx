import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { Link } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Alert from "@mui/material/Alert";

import { useGetBooksQuery, useDeleteBookMutation } from "@api/apiBooksSlice";
import { IBook } from "@custom-types/book";

import AdminGrid from "../grid-data";
import AdminBookForm from "./bookForm/adminBookForm";
import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminBooksSheet } from "./style";

const AdminBooksSheet = () => {
	const { data: booksData, isLoading, error } = useGetBooksQuery();
	const [bookToEditId, setBookToEditId] = useState<string | null>(null);
	const [deleteBook] = useDeleteBookMutation();
	const { alert } = useSelector((state: RootState) => state.alert);
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");

	useEffect(() => {
		console.log("Raw Books Data:", booksData);
	}, [booksData]);

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
			renderCell: (params) => (
				<Link to={`/book/${params.row.id}`}>{params.value}</Link>
			),
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

	const transformBookData = (data: IBook[]) => {
		if (!data) return [];
		const transformed = data.map((item: IBook) => {
			const { info, ...rest } = item;
			const result = {
				id: item._id,
				img: info?.img || "",
				title: info?.title || "",
				author: Array.isArray(info?.author)
					? info?.author?.map((a) => a?.title).join(", ")
					: info?.author?.title || "",
				publisher: info?.publisher?.title || "",
				genre: Array.isArray(info?.genre)
					? info?.genre?.map((g) => g?.title).join(", ")
					: info?.genre?.title || "",
				language: info?.language?.title || "",
				year: info?.year || 0,
				pages: info?.pages || 0,
				reviews: item.reviews?.length || 0,
			};
			console.log("Transformed Item:", result);
			return result;
		});
		return transformed;
	};

	return (
		<StyledAdminBooksSheet>
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
					data={transformBookData(booksData || [])}
					columns={gridColumns}
					isLoading={isLoading}
					error={error}
					deleteMethod={deleteBook}
					handleEdit={handleOpen}
				/>
			</ErrorBoundary>
			{alert && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminBooksSheet>
	);
};

export default AdminBooksSheet;

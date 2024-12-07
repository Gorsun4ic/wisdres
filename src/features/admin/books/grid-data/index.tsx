import { useState, useEffect } from "react";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useGetBooksQuery } from "@api/apiBooksSlice";

const columns: GridColDef<(typeof rows)[number]>[] = [
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
		width: 80,
		type: "number",
	},
	{
		field: "pages",
		headerName: "Pages",
		width: 100,
		type: "number",
	},
	{
		field: "reviews",
		headerName: "Reviews",
		width: 100,
		type: "number",
	},
];

const AdminBooksGrid = () => {
	const { data, error, isLoading } = useGetBooksQuery();
	const [books, setBooks] = useState([]);

	useEffect(() => {
		setBooks(data);
		console.log(books);
	}, [isLoading]);

	return (
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
	);
};

export default AdminBooksGrid;

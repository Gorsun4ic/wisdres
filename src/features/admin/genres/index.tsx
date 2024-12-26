import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Alert from "@mui/material/Alert";

import {useGetGenresQuery, useDeleteGenreMutation} from "@api/apiGenresSlice";

import AdminGrid from "@features/admin/grid-data";
import AdminGenreForm from "./genres-form";
import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminGenres } from "./style";

const AdminGenres = () => {
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [genreToEditId, setGenreToEditId] = useState<string | null>(null);
	const { data, isLoading, error } = useGetGenresQuery(null);
	const [deleteGenre] = useDeleteGenreMutation();
	const { alert } = useSelector((state: RootState) => state.alert);

	useEffect(() => {
		console.log(data);
	}, []);

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setGenreToEditId(id);
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
			field: "about",
			headerName: "About",
			width: 150,
		},
	];

	return (
		<StyledAdminGenres>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<RecentActorsIcon fontSize="large" />
					<p>Genres</p>
				</Stack>
				<Button size="small" onClick={() => handleOpen("add")}>
					Add a new genre
				</Button>
				<ErrorBoundary fallback={<ErrorMessage />}>
					<Modal open={open} onClose={handleClose}>
						<AdminGenreForm
							mode={formMode}
							genreId={genreToEditId}
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
					deleteMethod={deleteGenre}
					columns={gridColumns}
				/>
			</ErrorBoundary>
			{alert && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminGenres>
	);
};

export default AdminGenres;

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Alert from "@mui/material/Alert";

import {
	useGetPublishersQuery,
	useDeletePublisherMutation,
} from "@api/apiPublishersSlice";

import AdminGrid from "@features/admin/grid-data";
import AdminPublisherForm from "./publisherForm/adminPublisherForm";
import PublisherForm from "./publisherForm/publisherForm";

import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminPublishersSheet } from "./style";

const AdminPublishersSheet = () => {
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [publisherToEditId, setPublisherToEditId] = useState<string | null>(null);
	const { data, isLoading, error } = useGetPublishersQuery(null);
	const [deletePublisher] = useDeletePublisherMutation();
	const { alert } = useSelector((state: RootState) => state.alert);

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setPublisherToEditId(id);
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
		<StyledAdminPublishersSheet>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<RecentActorsIcon fontSize="large" />
					<p>Publishers</p>
				</Stack>
				<Button size="small" onClick={() => handleOpen("add")}>
					Add a new publisher
				</Button>
				<ErrorBoundary fallback={<ErrorMessage />}>
					<Modal open={open} onClose={handleClose}>
						<PublisherForm
							mode={formMode}
							publisherId={publisherToEditId}
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
					deleteMethod={deletePublisher}
					columns={gridColumns}
				/>
			</ErrorBoundary>
			{(alert && alert.place === "sheet") && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminPublishersSheet>
	);
};

export default AdminPublishersSheet;

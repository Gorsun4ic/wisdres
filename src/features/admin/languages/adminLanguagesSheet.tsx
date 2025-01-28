import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Alert from "@mui/material/Alert";

import {
	useGetLanguagesQuery,
	useDeleteLanguageMutation,
} from "@api/apiLanguagesSlice";

import AdminGrid from "@features/admin/grid-data";
import AdminLanguageForm from "@features/admin/languages/languageForm/adminLanguageForm";
import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminLanguagesSheet } from "./style";

const AdminLanguagesSheet = () => {
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [languageToEditId, setLanguageToEditId] = useState<string | null>(null);
	const { data, isLoading, error } = useGetLanguagesQuery(null);
	const [deleteLanguage] = useDeleteLanguageMutation();
	const { alert } = useSelector((state: RootState) => state.alert);

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setLanguageToEditId(id);
	};

	const handleClose = () => setOpen(false);

	const gridColumns: GridColDef[] = [
		{
			field: "title",
			headerName: "Title",
			width: 150,
		},
	];

	return (
		<StyledAdminLanguagesSheet>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					<RecentActorsIcon fontSize="large" />
					<p>Languages</p>
				</Stack>
				<Button size="small" onClick={() => handleOpen("add")}>
					Add a new language
				</Button>
				<ErrorBoundary fallback={<ErrorMessage />}>
					<Modal open={open} onClose={handleClose}>
						<AdminLanguageForm
							mode={formMode}
							languageId={languageToEditId}
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
					deleteMethod={deleteLanguage}
					columns={gridColumns}
				/>
			</ErrorBoundary>
			{alert && <Alert severity={alert.color}>{alert.title}</Alert>}
		</StyledAdminLanguagesSheet>
	);
};

export default AdminLanguagesSheet;

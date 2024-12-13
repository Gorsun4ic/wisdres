import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Alert from "@mui/material/Alert";

import AdminBooksGrid from "./grid-data";
import AdminBookForm from "./book-form";
import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { StyledAdminBooks } from "./style";

const AdminBooks = () => {
	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [bookToEditId, setBookToEditId] = useState<string | null>(null);
  const { alert } = useSelector((state: RootState) => state.alert);

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setBookToEditId(id);
	};

	const handleClose = () => setOpen(false);

	return (
		<StyledAdminBooks>
			<TabPanel value="1">
				<Stack direction="row" gap={4} className="books-panel__bar">
					<Stack
						gap={1}
						direction="row"
						sx={{ alignItems: "center" }}
						className="active-tab-section">
						<LibraryBooksIcon fontSize="large" />
						<p>Books</p>
					</Stack>
					<Button size="small" onClick={() => handleOpen("add")}>
						Add new book
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
					<AdminBooksGrid handleEdit={handleOpen}/>
				</ErrorBoundary>
				{alert && (
					<Alert severity={alert.color}>
						{alert.title}
					</Alert>
				)}
			</TabPanel>
		</StyledAdminBooks>
	);
};

export default AdminBooks;

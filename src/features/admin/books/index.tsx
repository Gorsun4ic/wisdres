import { useState } from "react";

import { Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AdminBooksGrid from "./grid-data";
import AdminBookForm from "./book-form";
import Modal from "@components/modal";
import Button from "@components/button";

import { StyledAdminBooks } from "./style";

const AdminBooks = () => {

		const [open, setOpen] = useState(false);
		const [formMode, setFormMode] = useState<"add" | "edit">("add");
		const [bookToEditId, setBookToEditId] = useState<string | null>(null);
		const handleOpen = (mode: ("add" | "edit"), id?: string) => {
			setOpen(true);
			setFormMode(mode);
			if (id) setBookToEditId(id)
		}
		const handleClose = () => setOpen(false);

	return (
		<StyledAdminBooks className="admin-panel">
			<TabPanel value="1">
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
						Add new book
					</Button>
					<Modal open={open} onClose={handleClose}>
						<AdminBookForm mode={formMode} bookId={bookToEditId} openModal={setOpen}/>
					</Modal>
				</Stack>
				<AdminBooksGrid handleEdit={handleOpen} />
			</TabPanel>
		</StyledAdminBooks>
	);
};

export default AdminBooks;

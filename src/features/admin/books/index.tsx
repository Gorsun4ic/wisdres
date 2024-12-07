import { useState } from "react";

import { Stack, Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AdminBooksGrid from "./grid-data";
import AddBookForm from "./add-book";
import Modal from "@components/modal";
import Button from "@components/button";

import { StyledAdminBooks } from "./style";

const AdminBooks = () => {

		const [open, setOpen] = useState(false);
		const handleOpen = () => setOpen(true);
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
					<Button size="small" onClick={handleOpen}>
						Add new book
					</Button>
					<Modal open={open} onClose={handleClose}>
						<AddBookForm />
					</Modal>
				</Stack>
				<AdminBooksGrid />
			</TabPanel>
		</StyledAdminBooks>
	);
};

export default AdminBooks;

import { useState, useEffect } from "react";

import { Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AdminBooks from "@features/admin/books";
import AdminAuthors from "@features/admin/authors";

import { StyledAdminPanel } from "./style";
const Admin = () => {
	const [value, setValue] = useState("1");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<StyledAdminPanel className="admin-panel">
			<TabContext value={value}>
				<Tabs value={value} onChange={handleChange}>
					<Tab
						icon={<LibraryBooksIcon />}
						iconPosition="start"
						label="Books"
						value="1"
					/>
					<Tab
						icon={<RecentActorsIcon />}
						iconPosition="start"
						label="Authors"
						value="2"
					/>
					<Tab label="Third" value="3" />
				</Tabs>
				<TabPanel value="1">
					<AdminBooks />
				</TabPanel>
				<TabPanel value="2">
					<AdminAuthors />
				</TabPanel>
				<TabPanel value="3">Third</TabPanel>
			</TabContext>
		</StyledAdminPanel>
	);
};

export default Admin;

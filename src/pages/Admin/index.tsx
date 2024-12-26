import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import AdminBooks from "@features/admin/books";
import AdminAuthors from "@features/admin/authors";
import AdminPublishers from "@features/admin/publishers";
import AdminGenres from "@features/admin/genres";

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
					<Tab
						icon={<NewspaperIcon />}
						iconPosition="start"
						label="Publishers"
						value="3"
					/>
					<Tab
						icon={<TheaterComedyIcon />}
						iconPosition="start"
						label="Genres"
						value="4"
					/>
				</Tabs>
				<TabPanel value="1">
					<AdminBooks />
				</TabPanel>
				<TabPanel value="2">
					<AdminAuthors />
				</TabPanel>
				<TabPanel value="3">
					<AdminPublishers />
				</TabPanel>
				<TabPanel value="4">
					<AdminGenres />
				</TabPanel>
			</TabContext>
		</StyledAdminPanel>
	);
};

export default Admin;

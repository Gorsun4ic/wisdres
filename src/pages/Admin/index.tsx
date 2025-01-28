import { useState } from "react";

// Tab components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

// Icons
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LanguageIcon from "@mui/icons-material/Language";

// Tab content
import AdminBooksSheet from "@features/admin/books/adminBooksSheet";
import AdminAuthorsSheet from "@features/admin/authors/adminAuthorsSheet";
import AdminPublishersSheet from "@features/admin/publishers/adminPublishersSheet";
import AdminGenresSheet from "@features/admin/genres/adminGenresSheet";
import AdminLanguagesSheet from "@features/admin/languages/adminLanguagesSheet";
import AdminUsersSheet from "@features/admin/users/adminUsersSheet";

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
					<Tab
						icon={<LanguageIcon />}
						iconPosition="start"
						label="Languages"
						value="5"
					/>
					<Tab
						icon={<RecentActorsIcon />}
						iconPosition="start"
						label="Users"
						value="6"
					/>
				</Tabs>
				<TabPanel value="1">
					<AdminBooksSheet />
				</TabPanel>
				<TabPanel value="2">
					<AdminAuthorsSheet />
				</TabPanel>
				<TabPanel value="3">
					<AdminPublishersSheet />
				</TabPanel>
				<TabPanel value="4">
					<AdminGenresSheet />
				</TabPanel>
				<TabPanel value="5">
					<AdminLanguagesSheet />
				</TabPanel>
				<TabPanel value="6">
					<AdminUsersSheet />
				</TabPanel>
			</TabContext>
		</StyledAdminPanel>
	);
};

export default Admin;

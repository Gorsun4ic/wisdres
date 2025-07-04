import { useState, useEffect } from "react";

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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// API
import { useCheckAuthQuery } from "@api/apiUsersSlice";

// Utils
import hasPermission from "@utils/hasPermission";

// Tab content
import BookSheet from "@features/admin/books/bookSheet";
import AuthorsSheet from "@features/admin/authors/authorsSheet";
import PublishersSheet from "@features/admin/publishers/publishersSheet";
import GenresSheet from "@features/admin/genres/genresSheet";
import LanguagesSheet from "@features/admin/languages/languagesSheet";
import UsersSheet from "@features/admin/users/usersSheet";
import AdminsSheet from "@features/admin/admins/adminsSheet";

import { StyledAdminPanel } from "./style";

const Admin = () => {
	const { data: userData } = useCheckAuthQuery();
	// Get activeTab from localStorage or default to "1"
	const [value, setValue] = useState(() => {
		const savedTab = localStorage.getItem("adminPanelActiveTab");
		return savedTab || "1";
	});
	const superAdmin = hasPermission(userData?.data, "view:admins");

	// Update localStorage when tab changes
	useEffect(() => {
		localStorage.setItem("adminPanelActiveTab", value);
	}, [value]);

	useEffect(() => {
		if (!superAdmin && localStorage.getItem("adminPanelActiveTab") === "7") {
			setValue("1");
		}
	}, [superAdmin]);


	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
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
					{superAdmin && (
						<Tab
							icon={<AdminPanelSettingsIcon />}
							iconPosition="start"
							label="Admins"
							value="7"
						/>
					)}
				</Tabs>
				<TabPanel value="1">
					<BookSheet />
				</TabPanel>
				<TabPanel value="2">
					<AuthorsSheet />
				</TabPanel>
				<TabPanel value="3">
					<PublishersSheet />
				</TabPanel>
				<TabPanel value="4">
					<GenresSheet />
				</TabPanel>
				<TabPanel value="5">
					<LanguagesSheet />
				</TabPanel>
				<TabPanel value="6">
					<UsersSheet />
				</TabPanel>
				<TabPanel value="7">
					<AdminsSheet />
				</TabPanel>
			</TabContext>
		</StyledAdminPanel>
	);
};

export default Admin;

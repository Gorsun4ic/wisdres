import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tab,
	Tabs,
} from "@mui/material";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

import { useCheckAuthQuery, useLogoutUserMutation } from "@api/apiUsersSlice";
import BookCollection from "@features/books/bookCollection/bookCollection";
import { UserProfileTab } from "./components/userProfileTab";
import { UserPersonalInfoTab } from "./components/userPersonalInfoTab";

import {
	StyledProfileContainer,
	StyledSidebar,
	StyledMainContent,
} from "./style";
import Button from "@components/button";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
	return (
		<div hidden={value !== index} style={{ width: "100%" }}>
			{value === index && children}
		</div>
	);
}

const UserProfile = () => {
	// Get activeTab from localStorage or default to 0
	const [activeTab, setActiveTab] = useState(() => {
		const savedTab = localStorage.getItem("userProfileActiveTab");
		return savedTab ? parseInt(savedTab) : 0;
	});

	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
	const navigate = useNavigate();

	const { data } = useCheckAuthQuery(null);
	const [logout, { isLoading }] = useLogoutUserMutation();

	// Update localStorage when activeTab changes
	useEffect(() => {
		localStorage.setItem("userProfileActiveTab", activeTab.toString());
	}, [activeTab]);

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			localStorage.removeItem("isAuthenticated");
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<StyledProfileContainer>
			<StyledSidebar>
				<Tabs
					orientation="vertical"
					value={activeTab}
					onChange={(_, newValue) => {
						if (newValue !== 3) {
							setActiveTab(newValue);
						}
					}}>
					<Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
					<Tab
						icon={<SecurityIcon />}
						iconPosition="start"
						label="Personal Info"
					/>
					<Tab
						icon={<HistoryIcon />}
						iconPosition="start"
						label="Recently Viewed"
					/>
					<Tab
						icon={<LogoutIcon />}
						iconPosition="start"
						label="Logout"
						onClick={() => setIsLogoutDialogOpen(true)}
						sx={{
							"&.Mui-selected": {
								color: "inherit",
								backgroundColor: "transparent",
							},
						}}
					/>
				</Tabs>
			</StyledSidebar>

			<StyledMainContent>
				<TabPanel value={activeTab} index={0}>
					<UserProfileTab userData={data?.user} />
				</TabPanel>
				<TabPanel value={activeTab} index={1}>
					<UserPersonalInfoTab userData={data?.user} />
				</TabPanel>
				<TabPanel value={activeTab} index={2}>
					<BookCollection
						filterBy="recent"
						number={5}
						title="Your recently viewed"
					/>
				</TabPanel>
			</StyledMainContent>

			<Dialog
				open={isLogoutDialogOpen}
				onClose={() => setIsLogoutDialogOpen(false)}>
				<DialogTitle>Confirm Logout</DialogTitle>
				<DialogContent>Are you sure you want to log out?</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setIsLogoutDialogOpen(false)}
						sx={{ minWidth: "120px" }}>
						Cancel
					</Button>
					<Button
						variant="primary"
						onClick={handleLogout}
						isLoading={isLoading}
						sx={{ minWidth: "120px" }}>
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</StyledProfileContainer>
	);
};

export default UserProfile;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tab,
	Tabs,
} from "@mui/material";

import { useTranslation } from "react-i18next";

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
import { gridColumnPositionsSelector } from "@mui/x-data-grid";

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
	const { t } = useTranslation();

	// Get activeTab from localStorage or default to 0
	const [activeTab, setActiveTab] = useState(() => {
		const savedTab = localStorage.getItem("userProfileActiveTab");
		return savedTab ? parseInt(savedTab) : 0;
	});

	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
	const navigate = useNavigate();

	const { data } = useCheckAuthQuery();
	const [logout, { isLoading }] = useLogoutUserMutation();

	// Update localStorage when activeTab changes
	useEffect(() => {
		localStorage.setItem("userProfileActiveTab", activeTab.toString());
	}, [activeTab]);

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			localStorage.removeItem("isAuthenticated");
			navigate("/", {replace: true});
			window.location.reload();
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
					<UserProfileTab userData={data?.data} />
				</TabPanel>
				<TabPanel value={activeTab} index={1}>
					<UserPersonalInfoTab userData={data?.data} />
				</TabPanel>
			</StyledMainContent>

			<Dialog
				open={isLogoutDialogOpen}
				onClose={() => setIsLogoutDialogOpen(false)}>
				<DialogTitle>{t("confirmLogout")}</DialogTitle>
				<DialogContent>{t("sureLogout")}</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setIsLogoutDialogOpen(false)}
						sx={{ minWidth: "120px" }}>
						{t("cancel")}
					</Button>
					<Button
						variant="primary"
						onClick={handleLogout}
						isLoading={isLoading}
						sx={{ minWidth: "120px" }}>
						{t("logout")}
					</Button>
				</DialogActions>
			</Dialog>
		</StyledProfileContainer>
	);
};

export default UserProfile;

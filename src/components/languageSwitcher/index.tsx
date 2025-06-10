import { useState } from "react";
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public"; // MUI globe icon
import { useTranslation } from "react-i18next";

const languages = [
	{ code: "en", name: "English", flag: "🇺🇸" },
	{ code: "ua", name: "Українська", flag: "🇺🇦" },
];

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChangeLanguage = (code: string) => {
		i18n.changeLanguage(code);
		handleClose();
	};

	return (
		<>
			<IconButton color="inherit" onClick={handleOpen}>
				<PublicIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{languages.map(({ code, name, flag }) => (
					<MenuItem key={code} onClick={() => handleChangeLanguage(code)}>
						<ListItemIcon>{flag}</ListItemIcon>
						<ListItemText>{name}</ListItemText>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

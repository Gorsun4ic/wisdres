// React router DOM
import { Link } from "react-router-dom";

// MUI Components
import { Stack } from "@mui/material";

// MUI Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useTranslation } from "react-i18next";

// Custom components
import Logo from "@components/logo";
import SearchBar from "../search-bar";
import LanguageSwitcher from "@components/languageSwitcher";

import "/node_modules/flag-icons/css/flag-icons.min.css";


// Custom styles
import { StyledHeader } from "./style";

const Header = () => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
	const { t } = useTranslation();

	const NAV_ITEMS = [
		{ label: t("books"), link: "/books" },
		{ label: t("authors"), link: "/authors" },
		{ label: t("publishers"), link: "/publishers" },
		{ label: t("contacts"), link: "/contacts" },
	];

	

	return (
		<StyledHeader className="header">
			<Stack
				direction="row"
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
				}}
				className="header__container">
				<Link to="/" className="logo">
					<Logo />
				</Link>
				<Stack
					direction="row"
					sx={{
						alignItems: "center",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
					className="header__nav">
					{NAV_ITEMS.map((item) => (
						<div
							className="header__item"
							key={item.label}
							style={{ position: "relative" }}>
							<Link to={item.link}>{item.label}</Link>
						</div>
					))}
				</Stack>
				<Stack
					direction="row"
					sx={{ alignItems: "center" }}
					gap={1}
					className="search-input">
					<SearchBar />
					<LanguageSwitcher />
					<Link to={isAuthenticated ? "/check-auth" : "/sign-in"}>
						<PersonOutlineOutlinedIcon />
					</Link>
				</Stack>
			</Stack>
		</StyledHeader>
	);
};

export default Header;

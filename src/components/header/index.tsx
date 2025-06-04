// React router DOM
import { Link } from "react-router-dom";

// MUI Components
import { Stack } from "@mui/material";

// MUI Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Custom components
import Logo from "@components/logo";
import SearchBar from "../search-bar";

// Custom styles
import { StyledHeader } from "./style";


const NAV_ITEMS = [
	{ label: "Books", link: "/books" },
	{ label: "Authors", link: "/authors" },
	{ label: "Publishers", link: "/publishers" },
	{ label: "Contacts", link: "/contacts" },
];

const Header = () => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";


	return (
		<StyledHeader className="header">
			<Stack
				direction="row"
				sx={{ justifyContent: "space-between", alignItems: "center" }}>
				<Link to="/">
					<Logo />
				</Link>
				<Stack
					direction="row"
					gap={2.5}
					sx={{ alignItems: "center", justifyContent: "center" }}
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
				<Stack direction="row" sx={{ alignItems: "center" }} gap={1}>
					<SearchBar />
					<Link to={isAuthenticated ? "/check-auth" : "/sign-in"}>
						<PersonOutlineOutlinedIcon />
					</Link>
				</Stack>
			</Stack>
		</StyledHeader>
	);
};

export default Header;

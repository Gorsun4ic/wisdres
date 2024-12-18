import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { ICategories } from "@custom-types/categories";
import Logo from "@components/logo";
import SearchBar from "@components/search-bar";
import { StyledHeader } from "./style";
import HeaderCategories from "./header-categories";

const fiction: ICategories = {
	title: "Fiction",
	content: [
		"Adventure",
		"Fantasy",
		"Science Fiction",
		"Mystery & Thriller",
		"Romance",
		"Historical Fiction",
		"Horror",
		"Literary Fiction",
		"Young Adult",
	],
};

const nonFiction: ICategories = {
	title: "Non-fiction",
	content: [
		"Biography & Memoir",
		"Self-Help & Personal Development",
		"Business & Economics",
		"History",
		"Science & Technology",
		"True Crime",
		"Health & Wellness",
		"Religion & Spirituality",
	],
};

const BookGenresList: ICategories[] = [fiction, nonFiction];

interface INavItem {
	label: string;
	content: ICategories[];
	link: string;
}

const NAV_ITEMS = [
	{ label: "Books", content: BookGenresList, link: "/books" },
	{ label: "Authors", content: BookGenresList, link: "/authors" },
	{ label: "Publishers", content: BookGenresList, link: "/publishers" },
	{ label: "Top books", content: BookGenresList, link: "/collections" },
	{ label: "Contacts", content:BookGenresList, link: "/contacts" }
];

const useHoverState = () => {
	const [hoveredItem, setHoveredItem] = useState<INavItem | null>(null);
	const [isBlockHovered, setIsBlockHovered] = useState(false);

	// Handle navigation item hover
	const handleMouseEnterNav = useCallback((item: INavItem) => {
		setHoveredItem(item); // Set the hovered item
	}, []);

	// Handle navigation item mouse leave
	const handleMouseLeaveNav = useCallback(() => {
		setTimeout(() => {
			if (!isBlockHovered || hoveredItem === null) {
				setHoveredItem(null); // Clear hovered item if block is not hovered
			}
		}, 1200)
	}, [isBlockHovered]);

	// Handle block hover state
	const handleMouseEnterBlock = useCallback(() => {
		setIsBlockHovered(true); // Block is hovered
	}, []);

	const handleMouseLeaveBlock = useCallback(() => {
		setIsBlockHovered(false); // Block is no longer hovered
		setHoveredItem(null); // Clear hovered item
	}, []);

	return {
		hoveredItem,
		handleMouseEnterNav,
		handleMouseLeaveNav,
		handleMouseEnterBlock,
		handleMouseLeaveBlock,
	};
};

const Header = () => {
	const {
		hoveredItem,
		handleMouseEnterNav,
		handleMouseLeaveNav,
		handleMouseEnterBlock,
		handleMouseLeaveBlock,
	} = useHoverState();

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
							style={{ position: "relative" }}
							onMouseEnter={() => handleMouseEnterNav(item)}
							onMouseLeave={handleMouseLeaveNav}>
							<Link to={item.link}>{item.label}</Link>
						</div>
					))}
				</Stack>
				<Stack direction="row" sx={{ alignItems: "center" }} gap={1}>
					<SearchBar />
					<PersonOutlineOutlinedIcon />
				</Stack>
			</Stack>
			{hoveredItem && (
				<HeaderCategories
					arr={hoveredItem.content}
					onMouseEnter={() => handleMouseEnterBlock()}
					onMouseLeave={handleMouseLeaveBlock}
				/>
			)}
		</StyledHeader>
	);
};

export default Header;

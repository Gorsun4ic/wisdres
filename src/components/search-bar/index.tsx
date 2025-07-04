import { useState, useEffect } from "react";
import { TextField, Box, Typography, ClickAwayListener } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

import { StyledSearchBar, StyledSearchResults } from "./style";
import { useDebounce } from "@hooks/useDebounce";
import { useSearchQuery } from "@api/apiSearchSlice";

interface SearchResult {
	id: string;
	title: string;
	type: "book" | "author" | "publisher";
	imageUrl?: string;
	author?: string;
	publisher?: string;
	genre?: string;
	language?: string;
}

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const debouncedSearch = useDebounce(searchTerm, 300);
	const { t } = useTranslation();


	const { data: searchResults, isLoading } = useSearchQuery(debouncedSearch, {
		skip: !debouncedSearch,
	});

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setIsOpen(true);
	};

	const handleClickAway = () => {
		setIsOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<StyledSearchBar className="search-bar">
				<TextField
					value={searchTerm}
					autoComplete="off"
					onChange={handleSearch}
					placeholder={t("searchBarPlaceholder")}
					slotProps={{
						input: {
							startAdornment: <SearchIcon />,
						},
					}}
					fullWidth
				/>
				{isOpen && searchTerm && (
					<StyledSearchResults>
						{isLoading ? (
							<Box p={2}>
								<Typography>Loading...</Typography>
							</Box>
						) : searchResults?.length ? (
							<>
								{searchResults.map((result: SearchResult) => (
									<Link
										key={`${result.type}-${result.id}`}
										to={`/${result.type}/${result.id}`}
										onClick={() => setIsOpen(false)}>
										<Box className="search-result-item">
											{result.imageUrl && (
												<img
													src={result.imageUrl}
													alt={result.title}
													width={40}
													height={40}
												/>
											)}
											<Box>
												<Typography variant="body1">{result.title}</Typography>
												<Typography variant="caption" color="textSecondary">
													{result.type === "book" && result.author
														? `by ${result.author
																.map((author: string) => author)
																.join(", ")}`
														: result.type}
												</Typography>
											</Box>
										</Box>
									</Link>
								))}
							</>
						) : (
							<Box p={2}>
								<Typography>{t("noResultsFound")}</Typography>
							</Box>
						)}
					</StyledSearchResults>
				)}
			</StyledSearchBar>
		</ClickAwayListener>
	);
};

export default SearchBar;

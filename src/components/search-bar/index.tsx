import { TextField } from "@mui/material";
import SearchIcon from "@components/search-icon";
import { StyledSearchBar } from "./style";

const SearchBar = () => {
	return (
		<StyledSearchBar className="search-bar">
			<SearchIcon />
			<TextField />
		</StyledSearchBar>
	)
};

export default SearchBar;
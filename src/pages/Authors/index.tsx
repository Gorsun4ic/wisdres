import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

import SearchBar from "@components/search-bar";

import { StyledAuthorsPage } from "./style";

const AuthorsPage = () => {
	const {data: authors} = useGetAuthorsQuery(null);

	const authorsList = authors?.map(item => {
		// const [authorName, authorBooksAmount] = item;
		return (
			<Grid2 size={3}>
				<Link to={`/author/${item?._id}`}>
					{item?.title}
					{` (${item?.bookIds?.length})`}
				</Link>
			</Grid2>
		);
	})

	return (
		<StyledAuthorsPage>
			<h1>Authors</h1>
			<SearchBar />
			<Grid2 container spacing={1} className="authors-list">
				{authorsList}
			</Grid2>
		</StyledAuthorsPage>
	);
};

export default AuthorsPage;
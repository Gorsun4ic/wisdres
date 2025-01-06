import { Stack } from "@mui/material";

import { useGetBooksByGenresQuery } from "@api/apiBooksSlice";

import BookFilters from "@features/books/book-filters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";

import { StyledGenrePage } from "./style";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
	const {genre} = useParams();
	const { data, error } = useGetBooksByGenresQuery(genre);
	console.log("Query URL:", `/books?genre=${genre}`);


	useEffect(() => {
		// Check the returned data
		if (data) {
			console.log(data); // Logs the array of books based on the genres
		} else if (error) {
			console.log(error); // Logs any error that occurred during the query
		}
	}, [data]);

	return (
		<StyledGenrePage>
			<h2 className="genre-name">Fantasy</h2>
			<Stack direction="row" gap={2} sx={{ alignItems: "flex-start" }}>
				<BookFilters />
				<Stack sx={{width: "100%"}}>
					<Stack
						direction="row"
						gap={2}
						sx={{ justifyContent: "space-between", marginBottom: 3 }}>
						<p className="book-amount">543 Books</p>
						<BookSort />
					</Stack>
					<Stack>
						<BookList data={data}/>
					</Stack>
				</Stack>
			</Stack>
		</StyledGenrePage>
	);
};

export default GenrePage;

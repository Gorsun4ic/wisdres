import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Stack } from "@mui/material";

import { useGetBooksByGenresQuery } from "@api/apiBooksSlice";

import { IFilter } from "@reducers/filters";

import { useBookFilters } from "@hooks/useBookFilters";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import BookFilters from "@features/books/book-filters/bookFilters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";

import { StyledGenrePage } from "./style";

const GenrePage = () => {
	const { genre = "" } = useParams<{ genre: string }>();
	const { data, error } = useGetBooksByGenresQuery(genre);
	const { sortBy, filters } = useSelector(
		(state: { filters: IFilter }) => state.filters
	);

	const { filterData, sortedBooks, updateFilterData } =
		useBookFilters(data || [], sortBy, filters);

  useEffect(() => {
		if (data) {
			updateFilterData();
		}
	}, [data, updateFilterData]);

	const genreTitle = upperCaseFirstLetter(genre);

	return (
		<StyledGenrePage>
			<h2 className="genre-name">{genreTitle}</h2>
			<Stack direction="row" gap={2} sx={{ alignItems: "flex-start" }}>
				<BookFilters data={filterData} />
				<Stack sx={{ width: "100%" }}>
					<Stack
						direction="row"
						gap={2}
						sx={{ justifyContent: "space-between", marginBottom: 3 }}>
						<p className="book-amount">543 Books</p>
						<BookSort />
					</Stack>
					<Stack>
						<BookList data={sortedBooks} />
					</Stack>
				</Stack>
			</Stack>
		</StyledGenrePage>
	);
};

export default GenrePage;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Stack } from "@mui/material";

import { useGetBooksByGenresQuery } from "@api/apiBooksSlice";

import { IBook } from "@custom-types/book";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import BookFilters from "@features/books/book-filters/bookFilters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";

import { StyledGenrePage } from "./style";

const GenrePage = () => {
	const { genre = "" } = useParams<{ genre: string }>();
	const { data, error } = useGetBooksByGenresQuery(genre);
	const [filterData, setFilterData] = useState({
		authors: [],
		publishers: [],
		languages: [],
		pages: [],
	});
	const { sortBy, filters } = useSelector((state) => state.filters);
	const genreTitle = upperCaseFirstLetter(genre);

	useEffect(() => {
		if (error) {
			console.log("Error fetching books:", error);
		}
	}, [error]);

	const filterBooks = (data: IBook[] | undefined) => {
		if (!data) return [];

		const { authors, languages, publishers, pages } = filters;

		return data
			.filter((book: IBook) =>
				authors.length ? authors.includes(book?.info?.author) : true
			)
			.filter((book: IBook) =>
				publishers.length ? publishers.includes(book?.info?.publisher) : true
			)
			.filter((book: IBook) =>
				languages.length ? languages.includes(book?.info?.language) : true
			)
			.filter((book: IBook) =>
				pages.length
					? book?.info?.pages >= pages[0] && book?.info?.pages <= pages[1]
					: true
			);
	};

	const sortBooks = (books: IBook[], sortBy: string) => {
		if (!books) return [];

		return books.sort((a, b) => {
			if (sortBy === "reviews") {
				return b.reviews.length - a.reviews.length;
			}
			if (sortBy === "ratings") {
				return b.info.rating - a.info.rating;
			}
			// if (sortBy === "downloads") {
			// 	return b.info.downloads - a.info.downloads;
			// }
			return 0;
		});
	};

	const filteredBooks = filterBooks(data);
	const sortedBooks = sortBooks(filteredBooks, sortBy);

	const getBooksSpecificData = (data: IBook[], str: string) => {
		if (!Array.isArray(data))
			throw new Error("Invalid input: data should be an array");

		const allowedKeys = ["author", "publisher", "language"];
		if (!allowedKeys.includes(str)) throw new Error("Invalid key");

		return data.map((item) => item?.info?.[str] || null);
	};

	const getAllFiltersData = () => {
		if (Array.isArray(data)) {
			return {
				authors: getBooksSpecificData(data, "author"),
				publishers: getBooksSpecificData(data, "publisher"),
				languages: getBooksSpecificData(data, "language"),
			};
		}
		return { authors: [], publishers: [], languages: [] };
	};

	useEffect(() => {
		if (data) {
			console.log("Books Data:", data);
			setFilterData(getAllFiltersData());
		} else if (error) {
			console.error("Error fetching books:", error);
		}
	}, [data, error]);

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

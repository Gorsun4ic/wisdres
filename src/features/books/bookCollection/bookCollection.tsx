import { useEffect, useState } from "react";

// MUI Components
import { Stack, Link, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// API Queries
import { useGetBooksQuery, useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

// Custom types
import { IBook } from "@custom-types/book";

// Custom hooks
import useFilterArr from "@hooks/useFilterArr";

import { getRecentViewedBook } from "@utils/handleLocalStorage";

// Custom features
import BookList from "@features/books/book-list";

// Custom components
import ErrorMessage from "@components/error";

// Custom theme
import theme from "@styles/theme";

// Custom styled components
import { StyledBookCollection } from "./style";

// Types of collections
type collectionFilters = "popularity" | "date" | "recent";

const BookCollection = ({
	title,
	filterBy,
	number,
	booksArr,
}: {
	title: string;
	filterBy: collectionFilters;
	number: number;
	booksArr?: IBook[];
}) => {
	const { data, isLoading, error } = useGetBooksQuery();
	const [getBookById, { data: info }] = useLazyGetBookByIdQuery();
	const [books, setBooks] = useState<IBook[] | []>([]);

	useEffect(() => {
		if (data) {
			setBooks(data);
		}
		if (booksArr) {
			setBooks(booksArr);
		}
	}, [data, booksArr]);


  useEffect(() => {
		const recentBooksIds = getRecentViewedBook(); // Assuming you have a function to get book IDs

		if (recentBooksIds && Array.isArray(recentBooksIds)) {
			// Make parallel API calls for all the recent books
			const bookRequests = recentBooksIds.map((id) => {
				return getBookById(id); // Trigger lazy query for each book
			});

			// Using Promise.all to fetch data for all books in parallel
			Promise.all(bookRequests)
				.then((responses) => {
					// Assuming each response contains the book info, you can now update the state
					const bookData = responses.map((response) => response.data); // Extract data from each response
					setBooks(bookData); // Update state with the book data
				})
				.catch((error) => {
					console.error("Error fetching book data:", error);
				});
		}
	}, [getBookById]);


	const list = useFilterArr(books, filterBy, number);

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	if (!data) {
		return null;
	}

	return (
		<StyledBookCollection className="collection">
			<Stack
				direction="row"
				sx={{
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 2.5,
				}}
				spacing={2}>
				<h2>{title}</h2>
				<Link
					href="#"
					underline="none"
					sx={{
						color: theme?.colors?.green,
						fontWeight: theme?.fontWeights?.medium,
					}}>
					<Stack
						direction="row"
						sx={{ alignItems: "center", justifyContent: "space-between" }}>
						Watch all
						<ArrowForwardIcon />
					</Stack>
				</Link>
			</Stack>
			<BookList data={list} />
		</StyledBookCollection>
	);
};

export default BookCollection;

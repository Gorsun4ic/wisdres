import { useEffect, useState } from "react";

// MUI Components
import { Stack, Link, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// API Queries
import { useGetBooksQuery } from "@api/apiBooksSlice";

// Custom types
import { IBook } from "@custom-types/book";

// Custom hooks
import useFilterArr from "@hooks/useFilterArr";

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
	const [books, setBooks] = useState<IBook[] | []>([]);

	useEffect(() => {
		if (data) {
			setBooks(data);
		}
		if (booksArr) {
			setBooks(booksArr);
		}
	}, [data, booksArr]);

	const list = useFilterArr(books, filterBy, number);

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	if (list?.length === 0) {
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

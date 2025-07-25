import { useEffect, useState } from "react";

// MUI Components
import { Stack, Link, CircularProgress } from "@mui/material";

// API Queries
import { useGetBooksQuery } from "@api/apiBooksSlice";

// Custom types
import { IBook } from "@custom-types/book";
import { SortType } from "@src/types/filter";

// Custom hooks
import useSortedBooks from "@src/hooks/useSortedBooks";

// Custom features
import BookList from "@features/books/book-list";

// Custom components
import ErrorMessage from "@components/error";

// Custom theme
import {scTheme} from "@styles/theme";

// Custom styled components
import { StyledBookCollection } from "./style";

const BookCollection = ({
	title,
	filterBy,
	number,
	booksArr,
}: {
	title: string;
	filterBy?: SortType;
	number?: number;
	booksArr?: IBook[];
}) => {
	const { data, isLoading, error } = useGetBooksQuery();

	const [books, setBooks] = useState<IBook[] | []>([]);

	useEffect(() => {
		const booksData = data?.success && data.data ? data.data : [];

		if (booksData) {
			setBooks(booksData);
		}
		if (booksArr) {
			setBooks(booksArr);
		}
	}, [data, booksArr]);

	const list = useSortedBooks(books, filterBy as SortType, number as number);

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
						color: scTheme?.colors?.main,
						fontWeight: scTheme?.fontWeights?.medium,
					}}></Link>
			</Stack>
			<BookList data={list} isLoading={isLoading} />
		</StyledBookCollection>
	);
};

export default BookCollection;

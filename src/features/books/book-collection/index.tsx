import { useEffect, useState } from "react";

import { Stack, Link, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useGetBooksQuery } from "@api/apiBooksSlice";

import useFilterArr from "@hooks/useFilterArr";

import BookList from "@features/books/book-list";

import ErrorMessage from "@components/error";

import theme from "@styles/theme";
import { StyledBookCollection } from "./style";

const BookCollection = ({
	title,
	filterBy,
	number,
}: {
	title: string;
	filterBy: string;
	number: number;
}) => {
	const { data, isLoading, error } = useGetBooksQuery();
	const [books, setBooks] = useState([]);

	useEffect(() => {
		setBooks(data);
	}, [data]);

	const list = useFilterArr(books, filterBy, number);

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
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
			<BookList arr={list} />
		</StyledBookCollection>
	);
};

export default BookCollection;

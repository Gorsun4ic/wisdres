import { Stack, Link, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "@api/apiBooksSlice";
import useFilterArr from "@hooks/useFilterArr";
import BookList from "@features/books/book-list";
import theme from "@styles/theme";
import { StyledBookCollection } from "./style";

const BookCollection = ({ title, filterBy, number }: { title: string, filterBy: string, number: number }) => {

	const { data, error, isLoading } = useGetBooksQuery();
	const [books, setBooks] = useState([]);

	useEffect(() => {
		setBooks(data);
		console.log(books);
	}, [data]);
	
	const List = useFilterArr(books, filterBy, number);

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
			{isLoading ? <CircularProgress /> : <BookList arr={List}/>}
		</StyledBookCollection>
	);
};

export default BookCollection;
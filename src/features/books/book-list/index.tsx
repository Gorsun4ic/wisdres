import { CircularProgress } from "@mui/material";

import { IBook } from "@custom-types/book";

import BookCard from "@features/books/book-card/bookCard";

import { StyledList } from "./style";

const BookList = ({
	data,
	isLoading,
}: {
	data: IBook[];
	isLoading: boolean;
}) => {
	if (!data) return;

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	const list = data?.map((item) => {
		return (
			<div key={item?._id} className="book-card">
				<BookCard data={item} />
			</div>
		);
	});

	return <StyledList>{list}</StyledList>;
};

export default BookList;

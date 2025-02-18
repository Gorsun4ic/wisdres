import { Stack } from "@mui/material";

import { IBook } from "@custom-types/book";

import BookCard from "@features/books/book-card/bookCard";

const BookList = ({ data }: { data: IBook[] }) => {

	const list = data?.map((item) => {
		return (
			<div key={item?._id}>
				<BookCard data={item} />
			</div>
		);
	});

	return (
		<Stack
			direction="row"
			gap={1}
			sx={{ alignItems: "stretch", display: "flex", flexWrap: "wrap" }}>
			{list}
		</Stack>
	);
};

export default BookList;

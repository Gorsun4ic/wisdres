import { Grid2 } from "@mui/material";

import { IBook } from "@custom-types/book";

import BookCard from "@features/books/book-card";

const BookList = ({ data }: { data: IBook[] }) => {

	const list = data?.map((item) => {
		return (
			<Grid2 size={2}>
				<BookCard data={item} />
			</Grid2>
		);
	});

	return (
		<Grid2 container spacing={1} sx={{alignItems: "stretch"}}>
			{list}
		</Grid2>
	);
};

export default BookList;

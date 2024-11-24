import { Stack } from "@mui/material";
import { IBookInfo } from "@custom-types/book";
import BookCard from "@features/books/book-card";

const BookList = () => {
	const data: IBookInfo = {
		img: "https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg",
		rating: 10,
		title: "Book title",
		genre: ["Fantasy"],
		author: "Authors name",
		publisher: "Some publisher",
		language: "English",
		year: 2017,
		pages: 348,
	};

	return (
		<Stack spacing={1.5} useFlexGap direction="row" sx={{ flexWrap: "wrap" }}>
			<BookCard data={data} />
			<BookCard data={data} />
			<BookCard data={data} />
			<BookCard data={data} />
			<BookCard data={data} />
		</Stack>
	);
};

export default BookList;

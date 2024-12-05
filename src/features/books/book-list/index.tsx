import { Grid2 } from "@mui/material";
import { IBookInfo } from "@custom-types/book";
import BookCard from "@features/books/book-card";

const BookList = ({ arr }: {arr: unknown[]}) => {
	// const data: IBookInfo = {
	// 	img: "https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg",
	// 	rating: 10,
	// 	title: "Book title",
	// 	genre: ["Fantasy"],
	// 	author: "Authors name",
	// 	publisher: "Some publisher",
	// 	language: "English",
	// 	year: 2017,
	// 	pages: 348,
	// };

	const List = arr.map((item) => {
		return (
			<Grid2 size={2}>
				<BookCard data={item} />
			</Grid2>
		);
	});

	return (
		<Grid2 container spacing={1}>
			{List}
		</Grid2>
	);
};

export default BookList;

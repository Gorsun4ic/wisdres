import { IBook } from "@custom-types/book";

import BookCard from "@features/books/book-card/bookCard";
import { StyledList } from "./style";

const BookList = ({ data }: { data: IBook[] }) => {

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

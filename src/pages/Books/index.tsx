import { useGetGenresQuery } from "@api/apiGenresSlice";

import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/book-collection";

const BooksPage = () => {
	const { data } = useGetGenresQuery(null);

	return (
		<div className="books-page">
			<GenresCollection data={data} />
			<BookCollection title="New arrivals" />
			<BookCollection title="Top books" />
		</div>
	);
};

export default BooksPage;

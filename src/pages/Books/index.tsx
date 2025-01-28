import { useGetGenresQuery } from "@api/apiGenresSlice";

import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

const BooksPage = () => {
	const { data } = useGetGenresQuery(null);

	return (
		<div className="books-page">
			<GenresCollection data={data} />
			<BookCollection title="New arrivals" filterBy="date" number={4} />
			<BookCollection title="Top books" filterBy="popularity" number={4} />
		</div>
	);
};

export default BooksPage;

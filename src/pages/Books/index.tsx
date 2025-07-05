import { useGetGenresQuery } from "@api/apiGenresSlice";

import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

const BooksPage = () => {
	const { data, isLoading } = useGetGenresQuery();

	return (
		<div className="books-page">
			{data && <GenresCollection data={data} isLoading={isLoading}/>}
			<BookCollection title="New arrivals" filterBy="date" number={6} />
			<BookCollection title="Top books" filterBy="rating" number={6} />
		</div>
	);
};

export default BooksPage;

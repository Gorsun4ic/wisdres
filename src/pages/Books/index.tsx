import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/book-collection";

const BooksPage = () => {
	return (
		<div className="books-page">
			<GenresCollection />
			<BookCollection title="New arrivals" />
			<BookCollection title="Top books" />
		</div>
	);
};

export default BooksPage;
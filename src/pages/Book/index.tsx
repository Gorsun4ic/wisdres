import BookOverview from "@features/books/book-overview";
import BookDescription from "@features/books/book-description";
import BookReviews from "@features/books/book-reviews";
import BookCollection from "@features/books/book-collection";

const BookPage = () => {
	return (
		<div className="book-page">
			<BookOverview />
			<BookDescription />
			<BookReviews />
			<BookCollection title="Similar books" />
		</div>
	);
}

export default BookPage;
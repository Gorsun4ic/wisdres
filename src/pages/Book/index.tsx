import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

// MUI Components
import { CircularProgress } from "@mui/material";

// API Queries
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";

// Custom utils
import { addRecentViewedBook } from "@utils/handleLocalStorage";

// Custom features
import BookOverview from "@features/books/book-overview";
import BookDescription from "@features/books/book-description";
import BookReviews from "@features/books/book-reviews";
import BookCollection from "@features/books/bookCollection/bookCollection";

const BookPage = () => {
	const { bookId } = useParams();

	// Functionality to show recently viewed books
	useEffect(() => {
		if (bookId) {
			addRecentViewedBook(bookId);
		}
	}, [bookId]);


	return (
		<div className="book-page">
			<BookOverview />
			<BookDescription />
			<BookReviews />
			<BookCollection title="Similar books" />
		</div>
	);
};

export default BookPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

// MUI Components
import { CircularProgress } from "@mui/material";

// API Queries
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";

// API Reducer
import { showBook } from "@reducers/activeBookPage";

// Custom utils
import { addRecentViewedBook } from "@utils/handleLocalStorage";

// Custom features
import BookOverview from "@features/books/book-overview";
import BookDescription from "@features/books/book-description";
import BookReviews from "@features/books/book-reviews";
import BookCollection from "@features/books/bookCollection/bookCollection";

// Custom components
import ErrorMessage from "@components/error";

const BookPage = () => {
	const { bookId } = useParams();
	const [getBookById, { data: bookData, isLoading, error }] =
		useLazyGetBookByIdQuery();
	const [getAuthorById, { data: authorData }] = useLazyGetAuthorByIdQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		if (bookId) {
			getBookById(bookId); // Trigger the query manually

			if (bookData) {
				getAuthorById(bookData?.info?.author);
			}

			dispatch(
				showBook({
					...bookData,
					aboutAuthor: authorData?.about,
				})
			);
		}
	}, [bookId, getBookById, getAuthorById, bookData, authorData]);

	// Functionality to show recently viewed books
	useEffect(() => {
		if (bookId) {
			addRecentViewedBook(bookId);
		}
	}, [bookId]);

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	if (!bookData) {
		return (
			<>
				<p>No data available for this book.</p>
				<Link to="../">Back to previous page</Link>
			</>
		);
	}

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

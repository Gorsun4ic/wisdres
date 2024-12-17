import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import ErrorMessage from "@components/error";

import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

import BookOverview from "@features/books/book-overview";
import BookDescription from "@features/books/book-description";
import BookReviews from "@features/books/book-reviews";
import BookCollection from "@features/books/book-collection";

const BookPage = () => {
	const { bookId } = useParams();
	const [getBookById, { data, isLoading, error }] = useLazyGetBookByIdQuery();

	useEffect(() => {
		if (bookId) {
			getBookById(bookId); // Trigger the query manually
		}
	}, [bookId, getBookById]);

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	if (!data) {
		return (
			<>
				<p>No data available for this book.</p>
				<Link to="../">
					Back to previous page
				</Link>
			</>
		);
	}

	return (
		<div className="book-page">
			<BookOverview data={data} />
			<BookDescription />
			<BookReviews />
			<BookCollection title="Similar books" />
		</div>
	);
};

export default BookPage;

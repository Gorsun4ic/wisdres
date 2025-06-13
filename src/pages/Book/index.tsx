import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";

// API Queries
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

// Custom utils
import { addRecentViewedBook } from "@utils/handleLocalStorage";

// Custom features
import BookOverview from "@features/books/book-overview";
import BookDescription from "@features/books/book-description/bookDescription";
import BookReviews from "@features/books/book-reviews";
import BookCollection from "@features/books/bookCollection/bookCollection";

const BookPage = () => {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [getBookById, {data, isLoading }] = useLazyGetBookByIdQuery();

	// Functionality to show recently viewed books
	useEffect(() => {
		if (bookId && data) {
			addRecentViewedBook(bookId);
		}
	}, [bookId, data]);

	// If there is no book with such id, navigate to 404 page

	useEffect(() => {
		if (bookId) {
			getBookById(bookId);
		}
	}, [bookId]);

	useEffect(() => {
		if (!isLoading && !data) {
			// navigate("*")
			const navigateTo404 = setTimeout(() => {
				navigate("*");
			}, 1000);
			return () => clearTimeout(navigateTo404);
		}
	}, [isLoading, data]);

	if (isLoading || !data) {
		return <div>
			<CircularProgress sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
		</div>
	}

	return (
		<div className="book-page">
			<BookOverview />
			<BookDescription />
			<BookReviews />
			<BookCollection title={t("similarBooks")} number={6} />
		</div>
	);
};

export default BookPage;

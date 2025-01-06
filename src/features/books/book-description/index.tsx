import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useLazyGetBookDetailsQuery } from "@api/apiBooksSlice";
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";
import { Grid2 } from "@mui/material";
import { StyledBookDescription } from "./style";

const BookDescription = () => {
	const { activeBookPage } = useSelector((state: RootState) => state);
	const bookId = activeBookPage?.activeBook?._id;
	const [getDetailsById, { data: details }] = useLazyGetBookDetailsQuery();
	const [getAuthorById, {data: authorsInfo}] = useLazyGetAuthorByIdQuery();
	const [getBookById, {data: bookInfo}] = useLazyGetBookByIdQuery();

	useEffect(() => {
		if (bookId) {
			getDetailsById(bookId);
			getBookById(bookId);
		}
	}, [getDetailsById, bookId, details]);

	useEffect(() => {
		if (bookInfo) {
			const authorId = bookInfo?.info?.author;
			getAuthorById(authorId);
		}
	}, [bookInfo]);

	return (
		<StyledBookDescription className="book-details">
			<h2>What is the book about</h2>
			<Grid2 container spacing={6} rowSpacing={6}>
				{details?.book && (
					<Grid2 size={6}>
						<h3>About the book</h3>
						<p>{details.book}</p>
					</Grid2>
				)}
				{details?.auditory && (
					<Grid2 size={6}>
						<h3>Who this book is for</h3>
						<p>{details.auditory}</p>
					</Grid2>
				)}
				{authorsInfo?.about && (
					<Grid2 size={6}>
						<h3>About author</h3>
						<p>{authorsInfo.about}</p>
					</Grid2>
				)}
			</Grid2>
		</StyledBookDescription>
	);
};

export default BookDescription;

import { useEffect } from "react";
import { useLazyGetBookDetailsQuery } from "@api/apiBooksSlice";
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";
import { Grid2, CircularProgress } from "@mui/material";
import { StyledBookDescription } from "./style";
import { useParams } from "react-router-dom";

interface Author {
	_id: string;
	title: string;
	img: string;
	about: string;
	bookIds: string[];
}

const BookDescription = () => {
	const {bookId} = useParams();

	const [
		getBookById,
		{ data: bookInfo, isLoading: isBookLoading, error: bookError },
	] = useLazyGetBookByIdQuery();

	useEffect(() => {
		if (bookId) {
			console.log("BookID:", bookId);
			getBookById(bookId);
		}
	}, [bookId, getBookById]);

	if (isBookLoading) {
		return (
			<StyledBookDescription>

				<CircularProgress />
			</StyledBookDescription>
		);
	}

	if (bookError) {
		console.log("Errors:", { bookError });
		return (
			<StyledBookDescription>

				<p>Error loading book details. Please try again later.</p>
			</StyledBookDescription>
		);
	}

	return (
		<StyledBookDescription className="book-details">
			<h2>What is the book about</h2>
			<Grid2 container spacing={6} rowSpacing={6}>
				{bookInfo?.details?.book && (
					<Grid2 xs={12} md={6}>
						<h3>About the book</h3>
						<p>{bookInfo.details.book}</p>
					</Grid2>
				)}

				{bookInfo?.details?.auditory && (
					<Grid2 xs={12} md={6}>
						<h3>Who this book is for</h3>
						<p>{bookInfo.details.auditory}</p>
					</Grid2>
				)}

				{bookInfo?.info?.author?.about && (
					<Grid2 xs={12} md={6}>
						<h3>About author</h3>
						<p>{bookInfo.info.author.about}</p>
					</Grid2>

				)}

			</Grid2>
		</StyledBookDescription>
	);
};

export default BookDescription;

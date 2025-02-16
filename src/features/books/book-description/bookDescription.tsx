// React
import { useEffect } from "react";

// React Router DOM
import { useParams } from "react-router-dom";

// MUI
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

// RTK Query
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

// Custom styles
import { StyledBookDescription } from "./style";

const BookDescription = () => {
	const { bookId } = useParams();

	const [
		getBookById,
		{ data: bookInfo, isLoading: isBookLoading, error: bookError },
	] = useLazyGetBookByIdQuery();

	useEffect(() => {
		if (bookId) {
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
		return (
			<StyledBookDescription>
				<p>Error loading book details. Please try again later.</p>
			</StyledBookDescription>
		);
	}

	if (!bookInfo) {
		return null;
	}

	return (
		<StyledBookDescription className="book-details">
			<h2>What is the book about</h2>
			<Grid container spacing={6} rowSpacing={6}>
				{bookInfo.details.book && (
					<Grid size={6}>
						<h3>About the book</h3>
						<p>{bookInfo.details.book}</p>
					</Grid>
				)}
				{bookInfo.details.auditory && (
					<Grid size={6}>
						<h3>Who this book is for</h3>
						<p>{bookInfo.details.auditory}</p>
					</Grid>
				)}
			</Grid>
		</StyledBookDescription>
	);
};

export default BookDescription;

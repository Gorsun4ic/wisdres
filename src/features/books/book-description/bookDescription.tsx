// React
import { useEffect } from "react";

// React Router DOM
import { useParams } from "react-router-dom";

// MUI
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useTranslation } from "react-i18next";


// RTK Query
import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

// Custom styles
import { StyledBookDescription } from "./style";

const BookDescription = () => {
	const { bookId } = useParams();
	const { t } = useTranslation();


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
				<p>{t("errorBookDescription")}</p>
			</StyledBookDescription>
		);
	}

	if (!bookInfo) {
		return null;
	}

	return (
		<StyledBookDescription className="book-details">
			<h2>{t("whatIsBookAbout")}</h2>
			<Stack>
				{bookInfo.details.book && (
					<div>
						<h3>{t("aboutBooks")}</h3>
						<p>{bookInfo.details.book}</p>
					</div>
				)}
				{bookInfo.details.auditory && (
					<div>
						<h3>{t("bookAuditory")}</h3>
						<p>{bookInfo.details.auditory}</p>
					</div>
				)}
			</Stack>
		</StyledBookDescription>
	);
};

export default BookDescription;

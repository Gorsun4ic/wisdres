import { useEffect } from "react";
import { useSelector } from "react-redux";

import { List, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useLazyGetBookReviewsQuery } from "@api/apiBooksSlice";

import getArrLength from "@utils/getArrLength";

import { StyledReviewsList } from "./style";

interface Review {
	author: string;
	date: string;
	rating: number;
	text: string;
}

const ReviewItem = (data: Review) => {
	const { author, date, rating, text } = data;
	const formatedDate = date.slice(0, 10);
	return (
		<div className="review__item">
			<Stack
				className="review__heading"
				direction="row"
				sx={{ justifyContent: "space-between" }}>
				<h4 className="review__name">{author}</h4>
				<time dateTime={date}>{formatedDate}</time>
			</Stack>
			<Stack
				direction="row"
				className="review__rating"
				sx={{ alignItems: "center", marginBottom: 0.5 }}>
				<p>Rating: {rating}</p>
				<StarIcon color="warning" />
			</Stack>
			<p className="review__text">{text}</p>
		</div>
	);
};

const ReviewsList = () => {
	const { activeBookPage } = useSelector((state: RootState) => state);
	const bookId = activeBookPage?.activeBook?._id;
	const [getReviewsById, { data: reviews }] = useLazyGetBookReviewsQuery();
	const reviewsAmount = getArrLength(reviews);

	useEffect(() => {
		if (bookId) {
			getReviewsById(bookId);
		}
	}, [getReviewsById, bookId, reviews]);

	const list = reviews?.map((item) => {
		const { userName, date, userRating, userText } = item;
		return (
			<ReviewItem
				author={userName}
				date={date}
				rating={userRating}
				text={userText}
			/>
		);
	});

	return (
		<StyledReviewsList>
			<h3>Reviews ({reviewsAmount})</h3>
			{reviews?.length === 0 && <p>Write the first review</p>}
			<List>{list}</List>
		</StyledReviewsList>
	);
};

export default ReviewsList;

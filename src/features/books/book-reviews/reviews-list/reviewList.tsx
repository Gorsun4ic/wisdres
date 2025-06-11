import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, Stack, Paper, Button, Pagination } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTranslation } from "react-i18next";

import {
	useGetBookReviewsQuery,
	useDeleteReviewMutation,
} from "@api/apiBooksSlice";
import { useCheckAuthQuery } from "@api/apiUsersSlice";

import hasPermission from "@utils/hasPermission";

import { StyledReviewsList } from "./style";

interface Review {
	author: string;
	date: string;
	rating: number;
	text: string;
}

const ReviewItem = ({
	data,
	bookId,
}: {
	data: Review;
	bookId: string;
	handleDeleteReview: (reviewId: string) => void;
}) => {
	const { t } = useTranslation();

	const { data: userData } = useCheckAuthQuery(null);
	const [deleteReview] = useDeleteReviewMutation();
	const handleDeleteReview = (id: string) => {
		if (id) {
			deleteReview({ bookId: bookId, reviewId: id });
		}
	};

	const { user, date, rating, text, _id } = data;
	const formatedDate = date.slice(0, 10);
	return (
		<Paper elevation={3} sx={{ padding: 2 }} className="review__item">
			<Stack
				className="review__heading"
				direction="row"
				sx={{ justifyContent: "space-between" }}>
				<h4 className="review__name">{user?.username}</h4>
				<time dateTime={date}>{formatedDate}</time>
			</Stack>
			<Stack
				direction="row"
				className="review__rating"
				sx={{ alignItems: "center", marginBottom: 0.5 }}>
				<p>
					{t("rating")}: {rating}
				</p>
				<StarIcon color="warning" />
			</Stack>
			<p className="review__text">{text}</p>
			{(userData?.user?._id === user?._id ||
				hasPermission(userData?.user, "delete:reviews")) && (
				<Button
					sx={{ marginTop: "16px" }}
					variant="contained"
					color="error"
					onClick={() => handleDeleteReview(_id)}>
					{t("reviewDelete")}
					{hasPermission(userData?.user, "delete:reviews") &&
						t("reviewDeleteAdmin")}
				</Button>
			)}
		</Paper>
	);
};

const ReviewsList = () => {
	const { t } = useTranslation();

	const { bookId } = useParams();
	const [page, setPage] = useState(1);
	const [reviews, setReviews] = useState([]);
	const { data, error, isLoading } = useGetBookReviewsQuery({
		id: bookId || "",
		page: page,
		limit: 3,
	});

	useEffect(() => {
		if (data?.reviews) {
			setReviews(data.reviews);
		}
	}, [data]);

	const list = reviews?.map((item) => {
		const { user, date } = item;
		return (
			<ReviewItem
				key={user?._id || `${user?.username}-${date}`}
				data={item}
				bookId={bookId}
			/>
		);
	});

	return (
		<StyledReviewsList>
			<h3>{t("reviewsNumber")} ({data?.totalReviews || 0 })</h3>
			{reviews.length === 0 && <p>{t("firstReview")}</p>}
			<List>{list}</List>
			{reviews.length !== 0 && (
				<Pagination
					count={Math.ceil(data?.totalReviews / 3)}
					page={page}
					onChange={(_, value) => setPage(value)}
				/>
			)}
		</StyledReviewsList>
	);
};

export default ReviewsList;

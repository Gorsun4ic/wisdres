import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	List,
	Stack,
	Paper,
	Button,
	Pagination,
	CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTranslation } from "react-i18next";

import {
	useGetBookReviewsQuery,
	useDeleteReviewMutation,
} from "@api/apiBooksSlice";
import { useCheckAuthQuery } from "@api/apiUsersSlice";

import ErrorMessage from "@components/error";

import { IReview } from "@custom-types/review";

import hasPermission from "@utils/hasPermission";

import { StyledReviewsList } from "./style";

const ReviewItem = ({
	data,
	handleDelete,
}: {
	data: IReview;
	handleDelete: (id: string) => void;
}) => {
	const { t } = useTranslation();

	const { data: userData } = useCheckAuthQuery();

	const { user, date, rating, text, _id } = data;
	const formatedDate = date.toString().slice(0, 10);

	if (!data) {
		return null;
	}

	return (
		<Paper elevation={3} sx={{ padding: 2 }} className="review__item">
			<Stack
				className="review__heading"
				direction="row"
				sx={{ justifyContent: "space-between" }}>
				<h4 className="review__name">{user?.username}</h4>
				<time dateTime={date.toString()}>{formatedDate}</time>
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
			{(userData?.data?._id === user?._id &&
				hasPermission(userData?.data, "delete:reviews")) && (
				<Button
					sx={{ marginTop: "16px" }}
					variant="contained"
					color="error"
					onClick={() => handleDelete(_id)}>
					{t("reviewDelete")}
					{hasPermission(userData?.data, "delete:reviews") && userData?.data?.role.includes("ADMIN") && 
						t("reviewDeleteAdmin")}
				</Button>
			)}
		</Paper>
	);
};

const ReviewsList = () => {
	const { t } = useTranslation();

	const { bookId } = useParams();
	const [deleteReview] = useDeleteReviewMutation();
	const [page, setPage] = useState(1);
	const [reviews, setReviews] = useState<IReview[] | []>([]);
	const { data, isLoading } = useGetBookReviewsQuery({
		id: bookId ?? "",
		page: page,
		limit: 3,
	});

	useEffect(() => {
		if (data?.data?.reviews && data?.data?.reviews?.length !== 0) {
			setReviews(data.data.reviews);
		}
	}, [data]);

	const handleDeleteReview = async (id: string) => {
		if (id && bookId) {
			const idToRefetch = bookId;
			await deleteReview({ bookId: idToRefetch, reviewId: id });
			setReviews(reviews.filter((review) => review._id !== id));
		}
	};

	if (!bookId) {
		return null;
	}

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	const list = reviews?.map((item, i) => {
		return <ReviewItem key={i} data={item} handleDelete={handleDeleteReview} />;
	});

	return (
		<StyledReviewsList>
			<h3>
				{t("reviewsNumber")} ({reviews.length})
			</h3>
			{reviews.length === 0 && <p>{t("firstReview")}</p>}
			{reviews.length !== 0 && <List>{list}</List>}
			{reviews.length !== 0 && data?.data?.totalReviews && (
				<Pagination
					count={Math.ceil(data?.data?.totalReviews / 3)}
					page={page}
					onChange={(_, value) => setPage(value)}
				/>
			)}
		</StyledReviewsList>
	);
};

export default ReviewsList;

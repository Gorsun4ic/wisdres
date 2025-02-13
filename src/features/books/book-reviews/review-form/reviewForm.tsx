import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Rating, Stack, Alert } from "@mui/material";

import { useCheckAuthQuery } from "@api/apiUsersSlice";
import { useAddNewReviewMutation } from "@api/apiBooksSlice";
import containsBadWords from "@utils/badWordsValidator";

import Button from "@components/button";
import FormField from "@components/formField";

import { StyledForm } from "./style";

type FormFields = {
	rating: number;
	text: string;
};

const ReviewForm = () => {
	const { data: userData } = useCheckAuthQuery(null);
	const { bookId } = useParams();
	const [addNewReview, { isLoading, error: addNewReviewError }] =
		useAddNewReviewMutation();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (bookId) {
			console.log(bookId);
		}
	}, [bookId]);

	// RHF
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<FormFields>();

	useEffect(() => {
		const isAuth = localStorage.getItem("isAuthenticated");
		if (isAuth) {
			setIsAuthenticated(true);
		}
		console.log(userData);
	}, [userData]);

	useEffect(() => {
		if (addNewReviewError) {
			console.log(addNewReviewError);
		}
	}, [addNewReviewError]);

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		if (bookId && userData) {
			const review = {
				bookId,
				review: {
					user: userData.user._id,
					text: data.text,
					rating: data.rating,
				},
			};
			console.log(review);
			addNewReview(review);
			reset();
		}
	};

	if (!isAuthenticated) {
		return (
			<StyledForm>
				<p>For writing a review, you need to be authenticated</p>
				<Button size="big" onClick={() => navigate("/sign-in")}>
					Login
				</Button>
			</StyledForm>
		);
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="rating-form">
			<Stack>
				<h3>Write your review</h3>
				{addNewReviewError && (
					<Alert severity="error">
						{addNewReviewError?.data?.message || "Failed to submit review"}
					</Alert>
				)}
				<Controller
					name="rating"
					control={control}
					defaultValue={5}
					rules={{ required: true }}
					render={({ field }) => (
						<Rating
							name="rating"
							defaultValue={5}
							max={10}
							onChange={(_, newValue) => field.onChange(newValue)}
						/>
					)}
				/>
				<FormField<FormFields>
					name="text"
					placeholder="Your review"
					register={register}
					validation={{
						required: "Review is required",
						minLength: {
							value: 4,
							message: "Review must have at least 4 characters",
						},
						maxLength: {
							value: 3000,
							message: "Review must have at most 1000 characters",
						},
						validate: (value: string) =>
							!containsBadWords(value) ||
							"Your input contains inappropriate words",
					}}
					error={errors.text?.message}
					multiline
					rows={4}
				/>
				<Button size="big" isLoading={isLoading} type="submit">
					Publish
				</Button>
			</Stack>
		</StyledForm>
	);
};

export default ReviewForm;

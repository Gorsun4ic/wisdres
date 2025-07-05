import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Rating, Stack, Alert } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useCheckAuthQuery } from "@api/apiUsersSlice";
import { useAddNewReviewMutation } from "@api/apiBooksSlice";
import containsBadWords from "@utils/badWordsValidator";

import Button from "@components/button/Button";
import FormField from "@components/formField";

import { StyledForm } from "./style";

type FormFields = {
	rating: number;
	text: string;
};

const ReviewForm = () => {
	const { data: userData } = useCheckAuthQuery();
	const { t } = useTranslation();
	const { bookId } = useParams();
	const [addNewReview, { error: addNewReviewError }] =
		useAddNewReviewMutation();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

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
	}, [userData]);

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		if (bookId && userData?.data) {
			const review = {
				bookId,
				review: {
					book: bookId,
					user: userData.data,
					text: data.text,
					rating: data.rating,
				},
			};
			addNewReview(review);
			reset();
		}
	};

	if (!isAuthenticated) {
		return (
			<StyledForm>
				<p>{t("reviewNotAuthenticated")}</p>
				<Button onClick={() => navigate("/sign-in")}>
					{t("login")}
				</Button>
			</StyledForm>
		);
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="rating-form">
			<Stack>
				<h3>{t("writeReview")}</h3>
				{addNewReviewError && (
					<Alert severity="error">
						{t("failedReview")}
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
					placeholder={t("yourReview")}
					register={register}
					validation={{
						required: t("reviewRequired"),
						minLength: {
							value: 4,
							message: t("reviewMinChars"),
						},
						maxLength: {
							value: 3000,
							message: t("reviewMaxChars"),
						},
						validate: (value: string) =>
							!containsBadWords(value) || t("reviewSwear"),
					}}
					error={errors.text?.message}
					multiline
					rows={4}
				/>
				<Button type="submit">
					{t("publish")}
				</Button>
			</Stack>
		</StyledForm>
	);
};

export default ReviewForm;

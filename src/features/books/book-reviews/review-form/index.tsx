import { useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

import { Rating, Grid2 } from "@mui/material";

import { useUpdateBookMutation } from "@api/apiBooksSlice";

// @ts-expect-error Cuz it's old library and it's have type any, but it's strings array
import badwordsArray from "badwords/array";

import Button from "@components/button";
import FormField from "@components/formField";

import { StyledForm } from "./style";

type FormFields = {
	rating: number;
	name: string;
	email: string;
	text: string;
};

const containsBadWords = (input: string): boolean => {
	const regex = new RegExp(`\\b(${badwordsArray.join("|")})\\b`, "i");
	return regex.test(input);
};

const ReviewForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm<FormFields>();
	const [updateBook] = useUpdateBookMutation();
	const { activeBookPage } = useSelector((state: RootState) => state);
	const onSubmit: SubmitHandler<FormFields> = (data) => {
		const date = new Date();
		const review = {
			userName: data.name,
			userEmail: data.email,
			userRating: data.rating,
			userText: data.text,
			date: date.toLocaleDateString(), // Add the current date
		};

		// Make an API call to PATCH the book and update the reviews array
		updateBook({
			id: activeBookPage.activeBook._id, // Pass the current book ID
			updates: { reviews: review },
		});

		reset()
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="rating-form">
			<h3>Write your review</h3>
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
			<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
				<Grid2 size={6}>
					<FormField<FormFields>
						name="name"
						placeholder="Your name"
						register={register}
						validation={{
							required: "Name is required",
							minLength: {
								value: 2,
								message: "Name must have at least 2 characters",
							},
							validate: (value: string) =>
								!containsBadWords(value) ||
								"Your input contains inappropriate words",
						}}
						error={errors.name?.message}
					/>
				</Grid2>
				<Grid2 size={6}>
					<FormField<FormFields>
						name="email"
						placeholder="Your email"
						register={register}
						validation={{
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
							minLength: {
								value: 5,
								message: "Email must have at least 5 characters",
							},
							validate: (value: string) =>
								!containsBadWords(value) ||
								"Your input contains inappropriate words",
						}}
						error={errors.email?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
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
							validate: (value: string) =>
								!containsBadWords(value) ||
								"Your input contains inappropriate words",
						}}
						error={errors.text?.message}
						multiline
						rows={4}
					/>
				</Grid2>
			</Grid2>
			<Button size="big" submit={true}>
				Publish
			</Button>
		</StyledForm>
	);
};

export default ReviewForm;

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Grid2, CircularProgress } from "@mui/material";

import { useAddBookMutation } from "@api/apiBooksSlice";

import Button from "@components/button";
import FormField from "@components/formField";

import { StyledForm } from "./style";

type FormFields = {
	title: string;
	img: string;
	genre: string;
	author: string;
	publisher: string;
	language: string;
	year: number;
	pages: number;
};

const useWatchImg = (watch: any) => {
	const [img, setImg] = useState<string | undefined>(undefined);
	const watchImg = watch("img");

	const imageTypes: string[] = [
		"jpeg",
		"png",
		"gif",
		"webp",
		"bmp",
		"svg+xml",
		"tiff",
		"heif",
		"heic",
		"jpg",
	];

	// Check if the image type is valid
	const isValidImageType = (fileName: string): boolean => {
		return imageTypes.some((type) => fileName.includes(`.${type}`));
	};

	useEffect(() => {
		if (watchImg && isValidImageType(watchImg)) {
			setImg(watchImg); // Set the image if it's valid
		} else {
			setImg(null);
		}
	}, [watchImg]);

	return img;
};

const useResetOnSuccess = (reset: () => void, isSubmitSuccessful: boolean) => {
		useEffect(() => {
			if (isSubmitSuccessful) reset();
		}, [isSubmitSuccessful]);
} 

const AddBookForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	const [addBook, { isLoading }] = useAddBookMutation();
	const img = useWatchImg(watch);
	useResetOnSuccess(reset, isSubmitSuccessful);

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		addBook({
			id: uuidv4(),
			...data,
		});
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="add-book-form">
			<h3 className="form-title">Add new book form</h3>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
					<Grid2 size={12} className="img-input">
						<FormField<FormFields>
							name="img"
							placeholder="Image link"
							register={register}
							validation={{
								required: "Image is required",
							}}
							error={errors.img?.message}
						/>
						{img && <img src={img} width="256" height="256" />}
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="title"
							placeholder="Books title"
							register={register}
							validation={{
								required: "Title is required",
								minLength: {
									value: 1,
									message: "Name must have at least 1 characters",
								},
							}}
							error={errors.title?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="genre"
							placeholder="Genre"
							register={register}
							validation={{
								required: "Genre is required",
								minLength: {
									value: 3,
									message: "Genre must have at least 3 characters",
								},
							}}
							error={errors.genre?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="author"
							placeholder="Authors name"
							register={register}
							validation={{
								required: "Author is required",
								minLength: {
									value: 4,
									message: "Authors name must have at least 4 characters",
								},
							}}
							error={errors.author?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="publisher"
							placeholder="Publishers name"
							register={register}
							validation={{
								required: "Publisher is required",
								minLength: {
									value: 4,
									message: "Publishers name must have at least 4 characters",
								},
							}}
							error={errors.publisher?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="language"
							placeholder="Language"
							register={register}
							validation={{
								required: "Language is required",
								minLength: {
									value: 2,
									message: "Language must have at least 2 characters",
								},
							}}
							error={errors.language?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="year"
							placeholder="Year"
							register={register}
							type="number"
							validation={{
								required: "Year is required",
								minLength: {
									value: 3,
									message: "Year must have 3 numbers",
								},
								maxLength: {
									value: 4,
									message: "Year must have 4 numbers",
								},
							}}
							error={errors.year?.message}
						/>
					</Grid2>
					<Grid2 size={6}>
						<FormField<FormFields>
							name="pages"
							placeholder="Pages number"
							register={register}
							type="number"
							validation={{
								required: "Pages is required",
								minLength: {
									value: 1,
									message: "Pages must have at least 1 characters",
								},
							}}
							error={errors.pages?.message}
						/>
					</Grid2>
				</Grid2>
			)}
			<Button size="big" submit={true}>
				Publish
			</Button>
		</StyledForm>
	);
};

export default AddBookForm;

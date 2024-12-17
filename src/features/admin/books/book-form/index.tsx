import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Grid2, CircularProgress, Autocomplete, TextField } from "@mui/material";

import {
	useAddBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
} from "@api/apiBooksSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

// Custom hooks
import useAlert from "@hooks/useAlert";
import useWatchImg from "@hooks/useWatchImg";
import useHandleAdminForm from "@hooks/useAdminForm";

// Custom components
import Button from "@components/button";
import FormField from "@components/formField";
import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

import ChangedInfo from "@features/admin/changedInfo";

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
	id?: string;
};

const AdminBookForm = ({
	bookId,
	mode,
	openModal,
}: {
	bookId: string | null;
	mode: "add" | "edit";
	openModal: (arg0: boolean) => void;
}) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		control,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	const [addBook, { isLoading: isAdding, error: addError }] =
		useAddBookMutation();
	const [updateBook] = useUpdateBookMutation();
	const [getBookById, { data: bookData, isLoading, error }] =
		useLazyGetBookByIdQuery();
	const { data: authorsList } = useGetAuthorsQuery(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const triggerAlert = useAlert();
	const { onEditMode, defineFormTitle, showTheDifference } = useHandleAdminForm(
		{ mode, triggerAlert, reset }
	);
	const formTitle = defineFormTitle({
		onEdit: `Edit ${bookData?.title || null} book`,
		onAdd: "Add new book",
	});
	const { isValidImageType, img, imgTypeError } = useWatchImg(watch);

	useEffect(() => {
		onEditMode(bookId, getBookById, bookData);
	}, [bookId, mode, bookData]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful]);

	const onSubmit = (data) => {
		switch (mode) {
			case "add":
				addBook(data);
				triggerAlert({
					title: `The book ${data?.title} was successfully added`,
					color: "success",
				});
				break;
			case "edit":
				setOpenDialog(true);
				setDataToEdit(data);
				break;
			default:
				console.warn(`Unknown mode: ${mode}`);
		}
	};

	const handleEdit = (confirm: boolean) => {
		if (confirm) {
			updateBook({
				id: bookId,
				updated: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The book ${bookData?.title} was successfully changed`,
				color: "success",
			});
		}
		setOpenDialog(false);
	};

	const changedInfo = () => {
		const differences = showTheDifference(bookData, dataToEdit);

		// Handle case when there are no differences
		if (!differences || differences.length === 0) {
			return null;
		}

		const { propertyToChange, oldVersion, newVersion } = differences[0]; // Using the first difference for now

		return (
			<ChangedInfo
				propertyToChange={propertyToChange}
				oldVersion={oldVersion}
				newVersion={newVersion}
			/>
		);
	};

	if (openDialog) {
		return (
			<ConfirmAction
				title={`Are you confirm to change the ${
					bookData.title || null
				} book info?`}
				openDialog={openDialog}
				onConfirm={handleEdit}
				onCancel={() => handleEdit(false)}>
				{changedInfo()}
			</ConfirmAction>
		);
	}

	if (isLoading || isAdding) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error || addError) {
		return <ErrorMessage />;
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="add-book-form">
			<h3 className="form-title">{formTitle}</h3>
			<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
				<Grid2 size={6} className="img-input">
					<FormField<FormFields>
						name="img"
						placeholder="Image link"
						register={register}
						validation={{
							required: "Image is required",
							validate: (value) => {
								if (value && isValidImageType(value)) {
									return true; // Validation passed
								}
								return imgTypeError; // Validation failed
							},
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
					{/* <FormField<FormFields>
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
					/> */}
					<Controller
						name="author"
						control={control}
						rules={{ required: "Author is required" }}
						render={({ field }) => (
							<>
								<p className="input-label">Author</p>
								<Autocomplete
									{...field}
									options={authorsList || []}
									getOptionLabel={(option) => option.title || ""}
									onChange={(event, value) => field.onChange(value)}
									renderInput={(params) => (
										<TextField
											{...params}
											name="author"
											register={register}
											placeholder="Authors name"
										/>
									)}
								/>
							</>
						)}
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
			<Button size="big" submit={true}>
				{mode === "edit" ? "Edit" : "Publish"}
			</Button>
		</StyledForm>
	);
};

export default AdminBookForm;

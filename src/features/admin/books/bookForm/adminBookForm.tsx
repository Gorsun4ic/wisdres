import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Grid2, CircularProgress } from "@mui/material";

// API
import {
	useAddBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
} from "@api/apiBooksSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetGenresQuery } from "@api/apiGenresSlice";
import { useGetLanguagesQuery } from "@api/apiLanguagesSlice";

// Custom hooks
import useAlert from "@hooks/useAlert";
import useWatchImg from "@hooks/useWatchImg";
import useHandleAdminForm from "@hooks/useAdminForm";

// Custom components
import Button from "@components/button";
import FormField from "@components/formField";
import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";
import SelectCheckboxes from "@components/selectCheckboxes";
import AutoCompleteField from "@components/autoCompleteField";

import ChangedInfo from "@components/changedInfo/changedInfo";
import { StyledForm } from "./style";
import { IBookInfo } from "@custom-types/book";

type FormFields = {
	title: string;
	img: string;
	genre: string;
	author: string;
	publisher: string;
	language: string;
	year: number;
	pages: number;
	about_book: string;
	about_auditory?: string;
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
	const { data: publishersList } = useGetPublishersQuery(null);
	const { data: genresList } = useGetGenresQuery(null);
	const {data: languagesList} = useGetLanguagesQuery(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const triggerAlert = useAlert();
	const { onEditMode, defineFormTitle, showTheDifference } = useHandleAdminForm(
		{ mode, reset }
	);
	const formTitle = defineFormTitle({
		onEdit: `Edit ${bookData?.title || null} book`,
		onAdd: "Add new book",
	});
	const { isValidImageType, img, imgTypeError } = useWatchImg(watch);

	useEffect(() => {
		if (bookId) {
			onEditMode(bookId, getBookById, bookData);
		}
	}, [bookId, bookData]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful]);

	const onSubmit = (data: IBookInfo) => {
		const { details, info } = data;
		console.log("Submitting data:", data);
		switch (mode) {
			case "add":
				addBook({
					info,
					details: { book: details.book, auditory: details.auditory },
					reviews: [],
				});
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
				updates: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The book ${bookData?.info?.title} was successfully changed`,
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
					bookData?.info?.title || null
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
					<p className="input-label">Image link</p>
					<FormField<FormFields>
						name="info.img"
						placeholder="Image link"
						register={register}
						validation={{
							required: "Image is required",
							validate: (value: string) => {
								if (value && isValidImageType(value)) {
									return true; // Validation passed
								}
								return imgTypeError; // Validation failed
							},
						}}
						error={errors?.info?.img?.message}
					/>
					{img && <img src={img} width="256" height="256" />}
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">Books title</p>
					<FormField<FormFields>
						name="info.title"
						placeholder="Books title"
						register={register}
						validation={{
							required: "Title is required",
							minLength: {
								value: 1,
								message: "Name must have at least 1 characters",
							},
						}}
						error={errors?.info?.title?.message}
					/>
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">Genres</p>
					<SelectCheckboxes
						dataList={genresList}
						control={control}
						name="info.genre"
						label="Genres"
					/>
				</Grid2>
				<Grid2 size={6}>
					<AutoCompleteField
						name="info.author"
						control={control}
						rules={{ required: "Author is required" }}
						options={authorsList || []}
						placeholder="Authors name"
						value={authorsList || ""}
						label="Author"
					/>
				</Grid2>
				<Grid2 size={6}>
					<AutoCompleteField
						name="info.publisher"
						control={control}
						rules={{ required: "Publisher is required" }}
						options={publishersList || []}
						value={publishersList || ""}
						placeholder="Publishers name"
						label="Publisher"
					/>
				</Grid2>
				<Grid2 size={6}>
					<AutoCompleteField
						name="info.language"
						control={control}
						rules={{ required: "Language is required" }}
						options={languagesList || []}
						placeholder="Languages name"
						value={languagesList || ""}
						label="Language"
					/>
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">Year</p>
					<FormField<FormFields>
						name="info.year"
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
						error={errors?.info?.year?.message}
					/>
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">Pages number</p>
					<FormField<FormFields>
						name="info.pages"
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
						error={errors?.info?.pages?.message}
					/>
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">About book</p>
					<FormField<FormFields>
						name="details.book"
						placeholder="About the book"
						register={register}
						multiline
						rows={4}
						validation={{
							required: "Information about the book is required",
							minLength: {
								value: 30,
								message:
									"Information about the book must have at least 30 characters",
							},
						}}
						error={errors?.details?.book?.message}
					/>
				</Grid2>
				<Grid2 size={6}>
					<p className="input-label">About auditory</p>
					<FormField<FormFields>
						name="details.auditory"
						placeholder="About the auditory"
						register={register}
						multiline
						rows={4}
						validation={{
							minLength: {
								value: 30,
								message:
									"Information about the auditory must have at least 30 characters",
							},
						}}
						error={errors?.details?.auditory?.message}
					/>
				</Grid2>
			</Grid2>
			<Button size="big" type="submit">
				{mode === "edit" ? "Edit" : "Publish"}
			</Button>
		</StyledForm>
	);
};

export default AdminBookForm;

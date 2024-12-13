import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Grid2, CircularProgress } from "@mui/material";

import {
	useAddBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
} from "@api/apiBooksSlice";
import { useFindDifference } from "@hooks/useDiffBetweenObj";
import { useUpperCaseFirstLetter } from "@hooks/useUpperCaseFLetter";
import { useAlert } from "@hooks/useAlert";

import Button from "@components/button";
import FormField from "@components/formField";
import ConfirmAction from "@components/confirmAction";
import ErrorMessage from "@components/error";

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

const useWatchImg = (watch: (arg0: string) => string) => {
	const [img, setImg] = useState<string | null | undefined>(undefined);
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
		return imageTypes.some((type) => fileName.endsWith(`.${type}`));
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
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	const [addBook, { isLoading: isAdding, error: addError }] =
		useAddBookMutation();
	const [updateBook] = useUpdateBookMutation();
	const [getBookById, { data: bookData, isLoading, error }] =
		useLazyGetBookByIdQuery();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const difference = useFindDifference(bookData, dataToEdit);
	const triggerAlert = useAlert();
	const img = useWatchImg(watch);
	useResetOnSuccess(reset, isSubmitSuccessful);

	useEffect(() => {
		onEditMode(mode, bookId);
	}, [bookId, mode, bookData]);

	const onSubmit: SubmitHandler<FormFields> = (data) => {
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
		}
		onEditMode(mode, bookId);
	};

	const onEditMode = (mode: "add" | "edit", id: string | null) => {
		if (mode === "edit" && id) {
			getBookById(id);
			reset(bookData);
		}
	};

	const handleEdit = (confirm: boolean) => {
		if (confirm) {
			updateBook({
				id: bookId,
				updatedBook: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The book ${bookData?.title} was successfully changed`,
				color: "success",
			});
		}
		setOpenDialog(false);
	};

	const defineFormTitle = (mode: "edit" | "add") => {
		switch (mode) {
			case "edit":
				return `Edit ${bookData?.title || null} book`;
			case "add":
				return "Add new book";
			default:
				throw "There is no defined mode";
		}
	};

	const showTheDifference = () => {
		if (difference) {
			return Object.entries(difference).map(([key, value]) => {
				const uppercasedKey = useUpperCaseFirstLetter(key);
				return (
					<div className="edit-property">
						<p className="edit-property__title">{uppercasedKey}</p>
						<p className="edit-property__old">Old version: {value?.from}</p>
						<p className="edit-property__new">New version: {value?.to}</p>
					</div>
				);
			});
		}
		return null;
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
				{showTheDifference()}
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
			<h3 className="form-title">{defineFormTitle(mode)}</h3>
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
			<Button size="big" submit={true}>
				{mode === "edit" ? "Edit" : "Publish"}
			</Button>
		</StyledForm>
	);
};

export default AdminBookForm;

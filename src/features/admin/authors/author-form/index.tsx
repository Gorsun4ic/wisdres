import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Grid2, CircularProgress } from "@mui/material";

import {
	useAddAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
} from "@api/apiAuthorsSlice";

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
	about: string;
	id?: string;
};

type Difference = {
	property: string;
	oldVers: string;
	newVers: string;
};

const AdminAuthorForm = ({
	authorId,
	mode,
	openModal,
}: {
	authorId: string | null;
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

	const [addAuthor, { isLoading: isAdding, error: addError }] =
		useAddAuthorMutation();
	const [updateAuthor] = useUpdateAuthorMutation();
	const [getAuthorById, { data: authorData, isLoading, error }] =
		useLazyGetAuthorByIdQuery();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const [difference, setDifference] = useState<Difference[] | null>([]);
	const triggerAlert = useAlert();
	const { onEditMode, defineFormTitle, showTheDifference } = useHandleAdminForm(
		{ mode, reset }
	);
	const formTitle = defineFormTitle({
		onEdit: `Edit ${authorData?.title || null} author`,
		onAdd: "Add new author",
	});

	const { isValidImageType, img, imgTypeError } = useWatchImg(watch);

	useEffect(() => {
		if (authorId) {
			onEditMode(authorId, getAuthorById, authorData);
		}
	}, [authorId, mode, authorData]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful]);

	const onSubmit = (data) => {
		switch (mode) {
			case "add":
				addAuthor(data);
				triggerAlert({
					title: `The author ${data?.title} was successfully added`,
					color: "success",
				});
				break;
			case "edit":
				setOpenDialog(true);
				setDataToEdit(data);
				changedInfo();
				break;
			default:
				console.warn(`Unknown mode: ${mode}`);
		}
	};

	const handleEdit = (confirm: boolean) => {
		if (confirm) {
			updateAuthor({
				id: authorId,
				updates: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The author ${authorData?.title} was successfully changed`,
				color: "success",
			});
		}
		setOpenDialog(false);
	};

	const changedInfo = () => {
		const differences = showTheDifference(authorData, dataToEdit);
		console.log(differences);

		// Handle case when there are no differences
		if (!differences || differences.length === 0) {
			return null;
		}

		// const { propertyToChange, oldVersion, newVersion } = differences[0];
		setDifference(differences);
	};

	if (openDialog) {
		return (
			<ConfirmAction
				title={`Are you confirm to change the ${
					authorData.title || null
				} info?`}
				openDialog={openDialog}
				onConfirm={handleEdit}
				onCancel={() => handleEdit(false)}>
				<ChangedInfo difference={difference} />
			</ConfirmAction>
		);
	}

	if (isLoading || isAdding) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error || addError) {
		return <ErrorMessage />;
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h3 className="form-title">{formTitle}</h3>
			<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
				<Grid2 size={12} className="img-input">
					<FormField<FormFields>
						name="img"
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
						error={errors.img?.message}
					/>
					{img && <img src={img} width="256" height="256" />}
				</Grid2>
				<Grid2 size={6}>
					<FormField<FormFields>
						name="title"
						placeholder="Author's name"
						register={register}
						validation={{
							required: "Name is required",
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
						name="about"
						placeholder="About author"
						register={register}
						validation={{
							required: "Author's info is required",
							minLength: {
								value: 3,
								message: "Author's info must have at least 3 characters",
							},
						}}
						error={errors.about?.message}
					/>
				</Grid2>
			</Grid2>
			<Button size="big" submit={true}>
				{mode === "edit" ? "Edit" : "Publish"}
			</Button>
		</StyledForm>
	);
};

export default AdminAuthorForm;

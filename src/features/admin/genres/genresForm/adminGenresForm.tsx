import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Grid2, CircularProgress } from "@mui/material";

import {
	useAddGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
} from "@api/apiGenresSlice";

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

const AdminGenreForm = ({
	genreId,
	mode,
	openModal,
}: {
	genreId: string | null;
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

	const [addGenre, { isLoading: isAdding, error: addError }] =
		useAddGenreMutation();
	const [updateGenre] = useUpdateGenreMutation();
	const [getGenreById, { data: genreData, isLoading, error }] =
		useLazyGetGenreByIdQuery();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const triggerAlert = useAlert();
	const { onEditMode, defineFormTitle, showTheDifference } = useHandleAdminForm(
		{ mode, triggerAlert, reset }
	);
	const formTitle = defineFormTitle({
		onEdit: `Edit ${genreData?.title || null} genre`,
		onAdd: "Add new genre",
	});

	const { isValidImageType, img, imgTypeError } = useWatchImg(watch);

	useEffect(() => {
		onEditMode(genreId, getGenreById, genreData);
	}, [genreId, mode, genreData]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful]);

	const onSubmit = (data) => {
		switch (mode) {
			case "add":
				addGenre(data);
				triggerAlert({
					title: `The genre ${data?.title} was successfully added`,
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
			updateGenre({
				id: genreId,
				updates: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The genre ${genreData?.title} was successfully changed`,
				color: "success",
			});
		}
		setOpenDialog(false);
	};

	const changedInfo = () => {
		const differences = showTheDifference(genreData, dataToEdit);

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
				title={`Are you confirm to change the ${genreData.title || null} info?`}
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
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h3 className="form-title">{formTitle}</h3>
			<Grid2 container spacing={6} rowSpacing={2} sx={{ marginBottom: 3 }}>
				<Grid2 size={12} className="img-input">
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
						error={errors.img?.message}
					/>
					{img && <img src={img} width="256" height="256" />}
				</Grid2>
				<Grid2 size={12}>
					<p className="input-label">Genre's name</p>
					<FormField<FormFields>
						name="title"
						placeholder="Genre's name"
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
			</Grid2>
			<Button size="big" submit={true}>
				{mode === "edit" ? "Edit" : "Publish"}
			</Button>
		</StyledForm>
	);
};

export default AdminGenreForm;

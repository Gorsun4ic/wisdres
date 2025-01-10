import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Grid2, CircularProgress } from "@mui/material";

import {
	useAddLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
} from "@api/apiLanguagesSlice";

// Custom hooks
import useAlert from "@hooks/useAlert";
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

const AdminLanguageForm = ({
	languageId,
	mode,
	openModal,
}: {
	languageId: string | null;
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

	const [addLanguage, { isLoading: isAdding, error: addError }] =
		useAddLanguageMutation();
	const [updateLanguage] = useUpdateLanguageMutation();
	const [getLanguageById, { data: languageData, isLoading, error }] =
		useLazyGetLanguageByIdQuery();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [dataToEdit, setDataToEdit] = useState<FormFields | null>(null);
	const [difference, setDifference] = useState<Difference[] | null>([]);
	const triggerAlert = useAlert();
	const { onEditMode, defineFormTitle, showTheDifference } = useHandleAdminForm(
		{ mode, reset }
	);
	const formTitle = defineFormTitle({
		onEdit: `Edit ${languageData?.title || null} language`,
		onAdd: "Add new language",
	});

	useEffect(() => {
		if (languageId) {
			onEditMode(languageId, getLanguageById, languageData);
		}
	}, [languageId, mode, languageData]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful]);

	const onSubmit = (data) => {
		switch (mode) {
			case "add":
				addLanguage(data);
				triggerAlert({
					title: `The language ${data?.title} was successfully added`,
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
			updateLanguage({
				id: languageId,
				updates: dataToEdit,
			});
			openModal(false);
			triggerAlert({
				title: `The language ${languageData?.title} was successfully changed`,
				color: "success",
			});
		}
		setOpenDialog(false);
	};

	const changedInfo = () => {
		const differences = showTheDifference(languageData, dataToEdit);
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
					languageData.title || null
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
				<Grid2 size={12}>
					<FormField<FormFields>
						name="title"
						placeholder="Language name"
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

export default AdminLanguageForm;

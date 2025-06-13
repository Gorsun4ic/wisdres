import { useState, useEffect } from "react";

import { useForm, FieldErrors, FieldValues } from "react-hook-form";

import { AdminConfig } from "@custom-types/adminFormConfig";

import { findDifferenceObjs } from "@utils/findDiffObjs";

import useAlert from "./useAlert";

export const useAdminForm = (
	config: AdminConfig,
	mode: "add" | "edit",
	id?: string
) => {
	const [addMutation, { isLoading: isAdding, error: addError }] =
		config.mutations.add();
	const [updateMutation, { isLoading: isUpdating, error: updateError }] =
		config.mutations.update();
	const [
		getById,
		{ data: dataById, isLoading: isGettingById, error: getByIdError },
	] = config.mutations.getById();

	const [dataToEdit, setDataToEdit] = useState(null);

	const form = useForm();
	const triggerAlert = useAlert();

	const {
		formState: { isSubmitSuccessful },
	} = form;

	// Dialog state
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [differences, setDifferences] = useState(null);

	useEffect(() => {
		if (isSubmitSuccessful && !addError) {
			form.reset();
			triggerAlert({
				title: `The ${config.entityName} was successfully added`,
				color: "success",
				place: "form",
			});
		}
	}, [isSubmitSuccessful, addError]);

	useEffect(() => {
		if (id && mode === "edit") {
			getById(id);
		}
	}, [id]);

	useEffect(() => {
		if (dataById) {
			form.reset(dataById);
		}
	}, [dataById]);


	const onSubmit = (data) => {
		switch (mode) {
			case "add":
				addMutation(data);
				break;
			case "edit":
				setOpenDialog(true);
				setDataToEdit(data);
				setDifferences(findDifferenceObjs(dataById, data));
				break;
			default:
				console.warn(`Unknown mode: ${mode}`);
		}
	};

	const handleEdit = (confirm: boolean) => {
		if (confirm) {
			updateMutation({
				id,
				updates: dataToEdit,
			});
			form.reset(dataToEdit);
		}
		setOpenDialog(false);
	};

	const getFieldError = (
		errors: FieldErrors<FieldValues>,
		fieldName: string
	) => {
		if (!errors || !fieldName) {
			return undefined;
		}

		const parts = fieldName.split(".");

		if (errors[fieldName]?.message) {
			return errors[fieldName]?.message;
		}

		return errors?.[parts[0]]?.[parts[1]]?.message;
	};

	return {
		onSubmit,
		openDialog,
		handleEdit,
		dataById,
		form,
		differences,
		getFieldError,
	};
};

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { AdminFormConfig } from "@custom-types/adminFormConfig";

import useAlert from "./useAlert";

export const useAdminForm = (
	config: AdminFormConfig,
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
			console.log("Data", dataToEdit);
		}
		setOpenDialog(false);
	};

	return {
		onSubmit,
		openDialog,
		handleEdit,
		dataById,
		form,
	};
};

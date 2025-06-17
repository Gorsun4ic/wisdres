import { useState, useEffect } from "react";

// RHF
import { useForm, FieldErrors, FieldValues } from "react-hook-form";

// Hooks
import useAlert from "./useAlert";

// Utils
import { findDifferenceObjs } from "@utils/findDiffObjs";

// Types
import {
	AdminConfig,
	ContentMutationTypes,
} from "@custom-types/adminFormConfig";
import { IAuthorInput } from "@src/types/author";
import { IBookInput } from "@src/types/book";
import { IGenreInput } from "@src/types/genre";
import { ILanguageInput } from "@src/types/language";
import { IPublisherInput } from "@src/types/publisher";

type ContentInterfaces =
	| IAuthorInput
	| IBookInput
	| IGenreInput
	| ILanguageInput
	| IPublisherInput;

export const useAdminForm = <T extends FieldValues>(
	config: AdminConfig<ContentMutationTypes>,
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

	const form = useForm<T>();
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
	}, [isSubmitSuccessful, addError, config.entityName, form, triggerAlert]);

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

	const onSubmit = (data: T) => {
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
				updates: dataToEdit as T,
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

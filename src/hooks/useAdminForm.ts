import { useState, useEffect } from "react";
import { useForm, FieldErrors, FieldValues } from "react-hook-form";

// Hooks
import useAlert from "./useAlert";

// Utils
import { findDifferenceObjs } from "@utils/findDiffObjs";
import { normalizeSubmission } from "@utils/normilizeBookIncome";
import { formatAutocompleteBookData, formatFromAutocompleteBookData } from "@utils/normilizeBookIncome";

// Types
import { AdminConfig } from "@custom-types/adminFormConfig";
import { IBookInputAutocomplete } from "@utils/normilizeBookIncome";

import { useTranslation } from "react-i18next";
import { LangType } from "@src/i18n";

import { AddMutation, UpdateMutation, GetByIdMutation } from "@src/features/admin/form-builder/formBuilder";

export const useAdminForm = <
	TData extends FieldValues,
	TMutations extends {
		add: () => AddMutation<TData>;
		update: () => UpdateMutation<TData>;
		getById: () => GetByIdMutation<TData>;
	}
>(
	config: AdminConfig<TMutations>,
	mode: "add" | "edit",
	id?: string
) => {
	const [addMutation] = config.mutations.add();
	const [updateMutation] = config.mutations.update();
	const [getById, { data: dataById }] = config.mutations.getById();
	const { i18n } = useTranslation();
	const lang = i18n.language as LangType;

	const [dataToEdit, setDataToEdit] = useState<TData | null>(null);
	const [formatedData, setFormatedData] = useState({});
	const [openDialog, setOpenDialog] = useState(false);
	const [differences, setDifferences] = useState<Partial<TData> | null>(null);

	const form = useForm<TData>();
	const triggerAlert = useAlert();

	useEffect(() => {
		if (id && mode === "edit") {
			getById(id);
		}
	}, [id, mode, getById]);

	useEffect(() => {
		if (dataById?.data?.info) {
			const result = formatAutocompleteBookData(dataById?.data, lang);
			form.reset(result as unknown as TData);
			setFormatedData(result);
			
		} else if (dataById) {
			form.reset(dataById?.data);
			setFormatedData(dataById?.data);
		}
	}, [dataById, form, setFormatedData, lang]);

	const onSubmit = async (data: TData) => {
		switch (mode) {
			case "add": {
				const payload = data?.info ? normalizeSubmission(data) : data;

				const result = await addMutation(payload);

				if ("data" in result) {
					triggerAlert({
						title: `The ${config.entityName} was successfully added`,
						color: "success",
						place: "form",
					});
					form.reset();
				} else if ("error" in result) {
					triggerAlert({
						title: `Error adding ${config.entityName}`,
						color: "error",
						place: "form",
					});
					console.error("Add failed:", result.error);
				}
				break;
			}

			case "edit":
				setOpenDialog(true);
				setDataToEdit(data);
				setDifferences(findDifferenceObjs(formatedData ?? {}, data));
				break;

			default:
				console.warn(`Unknown mode: ${mode}`);
		}
	};

	const handleEdit = (confirm: boolean) => {
		if (confirm && dataToEdit) {
			if (!dataToEdit?.info) {
				updateMutation({
					id,
					updates: dataToEdit,
				});
				form.reset(dataToEdit);
			} else if (dataToEdit?.info) {
				const result = formatFromAutocompleteBookData(dataToEdit as unknown as IBookInputAutocomplete);
				updateMutation({
					id,
					updates: result as unknown as TData,
				});
				
			}
		}
		setOpenDialog(false);
	};

	const getFieldError = <TFieldValues extends FieldValues = FieldValues>(
		errors: FieldErrors<TFieldValues>,
		fieldName: string
	): string | undefined => {
		const keys = fieldName.split(".") as Array<keyof TFieldValues>;
		let current: unknown = errors;

		for (const key of keys) {
			if (current && typeof current === "object" && key in current) {
				current = (current as Record<string, unknown>)[key as string];
			} else {
				return undefined;
			}
		}

		if (current && typeof current === "object" && "message" in current) {
			return (current as { message?: string }).message;
		}

		return undefined;
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

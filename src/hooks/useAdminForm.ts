import { useState, useEffect } from "react";
import { useForm, FieldErrors, FieldValues } from "react-hook-form";

// Hooks
import useAlert from "./useAlert";

// Utils
import { findDifferenceObjs } from "@utils/findDiffObjs";
import { normalizeSubmission } from "@utils/normilizeBookIncome";
import {
	formatAutocompleteBookData,
	formatFromAutocompleteBookData,
} from "@utils/normilizeBookIncome";

// Types
import { AdminConfig } from "@custom-types/adminFormConfig";
import { IBookInputAutocomplete } from "@utils/normilizeBookIncome";

import { useTranslation } from "react-i18next";
import { LangType } from "@src/i18n";

import { Difference } from "@utils/findDiffObjs";

export const useAdminForm = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config: AdminConfig<any>,
	mode: "add" | "edit",
	id?: string
) => {
	const [addMutation] = config.mutations.add();
	const [updateMutation] = config.mutations.update();
	const [getById, { data: dataById }] = config.mutations.getById();
	const { i18n } = useTranslation();
	const lang = i18n.language as LangType;

	const [dataToEdit, setDataToEdit] = useState<FieldValues | null>(null);
	const [formatedData, setFormatedData] = useState<FieldValues | undefined>();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [differences, setDifferences] =
		useState<Difference<FieldValues> | null>(null);

	const form = useForm();
	const triggerAlert = useAlert();

	useEffect(() => {
		if (id && mode === "edit") {
			getById(id);
		}
	}, [id, mode, getById]);

	useEffect(() => {
		if (!dataById?.data) return;

		let payload;
		if ("info" in dataById.data) {
			const formatted = formatAutocompleteBookData(dataById.data, lang);
			payload = formatted;
		} else {
			payload = dataById.data;
		}

		form.reset(payload);
		setFormatedData(payload);
	}, [dataById, form, lang]);

	const onSubmit = async (data: FieldValues) => {
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
		if (confirm && dataToEdit && typeof id === "string") {
			if (!dataToEdit?.info) {
				updateMutation({
					id,
					updates: dataToEdit,
				});
				form.reset(dataToEdit);
			} else if (dataToEdit?.info) {
				const result = formatFromAutocompleteBookData(
					dataToEdit as unknown as IBookInputAutocomplete
				);
				updateMutation({
					id,
					updates: result,
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

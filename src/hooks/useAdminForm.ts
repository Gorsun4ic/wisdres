import { UseFormReset } from "react-hook-form";

import findDifferenceObjs from "@utils/findDiffObjs";
import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

type UseHandleAdminForm<T> = {
	mode: "add" | "edit";
	reset: UseFormReset<T>;
};


// Define the hook
const useHandleAdminForm = <T>({ mode, reset }: UseHandleAdminForm<T>) => {
	// If form was called for edit some info
	const onEditMode = (
		id: string | null,
		getDataById,
		data: T
	) => {
		if (mode === "edit" && id) {
			getDataById(id);
			reset(data);
		}
	};

	// Define form title depend on a mode
	const defineFormTitle = ({
		onEdit,
		onAdd,
	}: {
		onEdit: string;
		onAdd: string;
	}) => {
		switch (mode) {
			case "edit":
				return onEdit;
			case "add":
				return onAdd;
			default:
				throw "There is no defined mode";
		}
	};

	// Show a difference inside of the confirm dialog between old and new info
	const showTheDifference = (obj1, obj2) => {
		if (obj1 && obj2) {
			const difference = findDifferenceObjs(obj1, obj2); // Ensure this function is implemented
			if (!difference || Object.keys(difference).length === 0) return []; // Handle empty differences

			return Object.entries(difference).map(([key, value]) => {
				const upperCasedKey = upperCaseFirstLetter(key); // Ensure this function is implemented
				return {
					propertyToChange: upperCasedKey,
					oldVersion: value.from, // Expect `from` to exist in the `value` object
					newVersion: value.to, // Expect `to` to exist in the `value` object
				};
			});
		}
		return null; // Return null if obj1 or obj2 is invalid
	};

	return {
		onEditMode,
		defineFormTitle,
		showTheDifference,
	};
};

export default useHandleAdminForm;

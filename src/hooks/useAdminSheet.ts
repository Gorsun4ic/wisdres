// useData.ts
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@store/index";

import useAlert from "@hooks/useAlert";

import { AdminConfig } from "@custom-types/adminFormConfig";

type SheetMutations<T> = {
	getAll: () => { data?: T[]; isLoading: boolean; error?: unknown };
	delete: () => [(id: string) => Promise<{ data?: unknown; error?: unknown }>];
};

export const useAdminSheet = <TData, TMutations extends SheetMutations<TData>>(
	config: AdminConfig<TMutations>
) => {
	const [deleteMutation] = config.mutations.delete();
	const { data, isLoading, error } = config.mutations.getAll();

	const { alert } = useSelector((state: RootState) => state.alert);
	const triggerAlert = useAlert();

	const [open, setOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [toEditId, setToEditId] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		try {
			await deleteMutation(id);
			triggerAlert({
				title: `The ${config.entityName} was successfully deleted`,
				color: "success",
				place: "sheet",
			});
		} catch (error) {
			triggerAlert({
				title: `Failed to delete ${config.entityName}`,
				color: "error",
				place: "sheet",
			});
			console.error(error);
		}
	};

	const handleOpen = (mode: "add" | "edit", id?: string) => {
		setOpen(true);
		setFormMode(mode);
		if (id) setToEditId(id);
	};

	const handleClose = () => {
		setOpen(false);
		setToEditId(null);
		setFormMode("add");
	};

	return {
		open,
		data,
		isLoading,
		error,
		setOpen,
		deleteMutation,
		formMode,
		toEditId,
		alert,
		handleOpen,
		handleClose,
		handleDelete,
	};
};

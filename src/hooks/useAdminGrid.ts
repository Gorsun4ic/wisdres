import { useState, useEffect } from "react";

import useAlert from "@hooks/useAlert";

interface UseAdminGridProps<T> {
	data: T[] | undefined;
	onDelete: (id: string, title: string) => Promise<void>;
}

export function useAdminGrid<
	T extends { _id: string; info?: { title: string } }
>({ data, onDelete }: UseAdminGridProps<T>) {
	const [items, setItems] = useState<T[]>([]);
	const [selectedItem, setSelectedItem] = useState<T | null>(null);
	const [openDialog, setOpenDialog] = useState(false);


	useEffect(() => {
		if (data) {
			const formattedData = formatGridData(data);
			setItems(formattedData);
		}
	}, [data]);

	const formatGridData = (data: T[]) => {
		return data.map((item) => ({
			...item,
			id: item._id,
			...(item.info || {}),
		}));
	};

	const handleDeleteDialog = (item: T) => {
		setSelectedItem(item);
		setOpenDialog(true);
	};

	const handleDialogAction = async (confirm: boolean) => {
		if (confirm && selectedItem) {
			await onDelete(selectedItem._id, selectedItem.info?.title || "");
			setItems((prev) => prev.filter((item) => item._id !== selectedItem._id));
		}
		setOpenDialog(false);
		setSelectedItem(null);
	};

	return {
		items,
		selectedItem,
		openDialog,
		handleDeleteDialog,
		handleDialogAction,
	};
}

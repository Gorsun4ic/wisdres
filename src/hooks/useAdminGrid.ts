import { useState, useEffect, useCallback } from "react";
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

	const formatGridData = useCallback((data: T[]) => {
		return data.map((item) => ({
			...item,
			id: item._id,
			...(item.info || {}),
		}));
	}, []);

	useEffect(() => {
		if (Array.isArray(data)) {
			const formattedData = formatGridData(data);
			setItems(formattedData);
		}
		console.log(data)
	}, [data, formatGridData]);
	

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

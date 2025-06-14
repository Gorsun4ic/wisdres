import { useEffect, useState } from "react";

import { AdminConfig } from "@custom-types/adminFormConfig";
export const useChangeUserStatus = (config: AdminConfig) => {
	const [
		changeUserStatus,
		{ data, isLoading: isChanging, error: changeError },
	] = config.mutations.changeUserStatus();
	const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);
	const [changeUserId, setChangeUserId] = useState<string | null>(null);
	const [changeStatus, setChangeStatus] = useState<{
		show: boolean;
		message: string;
		severity: "success" | "error";
	}>({ show: false, message: "", severity: "success" });

	useEffect(() => {
		if (data && !changeError && !isChanging) {
			setChangeStatus({
				show: true,
				message: config.successChangeUserStatus,
				severity: "success",
			});
			setTimeout(() => {
				setChangeStatus({ show: false, message: "", severity: "success" });
			}, 3000);
		}
	}, [data]);

	useEffect(() => {
		if (changeError) {
			setChangeStatus({
				show: true,
				message: changeError?.data?.error || config.failChangeUserStatus,
				severity: "error",
			});
			setTimeout(() => {
				setChangeStatus({ show: false, message: "", severity: "error" });
			}, 3000);
		}
	}, [changeError]);

	const handleChange = async () => {
		changeUserStatus(changeUserId);
		setIsChangeDialogOpen(false);
	};

	return {
		isChangeDialogOpen,
		setIsChangeDialogOpen,
		setChangeUserId,
		changeStatus,
		handleChange,
		isChanging,
		changeError,
	};
};

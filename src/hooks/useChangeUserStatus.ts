import { useEffect, useState, useRef } from "react";

import { AdminMutations } from "@src/features/admin/admins/admins.config";
import { UserMutations } from "@src/features/admin/users/users.config";

import { AdminConfig } from "@src/types/adminFormConfig";

export const useChangeUserStatus = (
	config: AdminConfig<AdminMutations | UserMutations>
) => {
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

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (data && !changeError && !isChanging && config.successChangeUserStatus) {
			setChangeStatus({
				show: true,
				message: config.successChangeUserStatus,
				severity: "success",
			});
			timeoutRef.current = setTimeout(() => {
				setChangeStatus({ show: false, message: "", severity: "success" });
			}, 3000);
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [data, changeError, isChanging, config.successChangeUserStatus]);

	useEffect(() => {
		if (changeError && config.failChangeUserStatus) {
			setChangeStatus({
				show: true,
				message: config.failChangeUserStatus,
				severity: "error",
			});
			timeoutRef.current = setTimeout(() => {
				setChangeStatus({ show: false, message: "", severity: "error" });
			}, 3000);
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [changeError, config.failChangeUserStatus]);

	const closeDialog = () => {
		setIsChangeDialogOpen(false);
		setChangeUserId(null);
	};

	const handleChange = async () => {
		if (changeUserId) {
			try {
				await changeUserStatus(changeUserId);
				
				closeDialog()
			} catch (e) {
				console.error(e)
			}
		}
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

import { useState } from "react";
import {
	Box,
	Stack,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
// import { useUpdatePasswordMutation } from "@api/apiUsersSlice";
import { useTranslation } from "react-i18next";

import PasswordField from "@components/passwordField/PasswordField";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import LockIcon from "@mui/icons-material/Lock";
import { useTheme } from "styled-components";

interface UserPersonalInfoTabProps {
	userData: {
		username: string;
		email: string;
	};
}

type PasswordFormData = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export const UserPersonalInfoTab = ({ userData }: UserPersonalInfoTabProps) => {
	const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	// const [updatePassword] = useUpdatePasswordMutation();
	const theme = useTheme();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<PasswordFormData>();

	const onSubmit = async (data: PasswordFormData) => {
		setIsLoading(true);
		try {
			// await updatePassword(data).unwrap();
			setIsPasswordDialogOpen(false);
			reset();
		} catch (error) {
			console.error("Password update failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				{t("personalInfo")}
			</Typography>

			<Box
				sx={{
					backgroundColor: "white",
					padding: 3,
					borderRadius: 2,
					marginTop: 3,
				}}>
				<Stack spacing={3}>
					<Stack spacing={2}>
						<Typography>
							<strong>{t("userName")}:</strong> {userData?.username}
						</Typography>
						<Typography>
							<strong>{t("email")}:</strong> {userData?.email}
						</Typography>
					</Stack>
					<Button
						variant="primary"
						size="small"
						onClick={() => setIsPasswordDialogOpen(true)}
						startIcon={<LockIcon />}>
						{t("changePassword")}
					</Button>
				</Stack>
			</Box>

			<Dialog
				open={isPasswordDialogOpen}
				onClose={() => setIsPasswordDialogOpen(false)}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>{t("changePassword")}</DialogTitle>
					<DialogContent>
						<Stack spacing={2} sx={{ marginTop: 2 }}>
							<Stack spacing={1}>
								<Typography variant="body1">{t("currentPassword")}</Typography>
								<PasswordField
									name="currentPassword"
									placeholder={t("enterCurrentPassword")}
									register={register}
									error={errors.currentPassword?.message}
								/>
							</Stack>
							<Stack spacing={1}>
								<Typography variant="body1">{t("newPassword")}</Typography>
								<PasswordField
									name="newPassword"
									placeholder={t("enterNewPassword")}
									register={register}
									error={errors.newPassword?.message}
								/>
							</Stack>
							<Stack spacing={1}>
								<Typography variant="body1">Confirm New Password</Typography>
								<PasswordField
									name="confirmPassword"
									placeholder={t("confirmNewPassword")}
									register={register}
									validation={{
										validate: (value: string) => {
											if (watch("newPassword") !== value) {
												return t("passwordIncorrect");
											}
										},
									}}
									error={errors.confirmPassword?.message}
								/>
							</Stack>
						</Stack>
					</DialogContent>
					<DialogActions
						sx={{
							padding: "20px",
							justifyContent: "center",
							gap: "12px",
						}}>
						<Button
							variant="outlined"
							onClick={() => setIsPasswordDialogOpen(false)}
							sx={{ minWidth: "120px" }}>
							{t("cancel")}
						</Button>
						<Button
							variant="primary"
							type="submit"
							isLoading={isLoading}
							sx={{ minWidth: "120px" }}>
							{t("updatePassword")}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

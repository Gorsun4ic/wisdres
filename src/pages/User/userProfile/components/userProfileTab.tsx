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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateUserMutation } from "@api/apiUsersSlice";

import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

import FormField from "@components/formField";
import Button from "@components/button";
import { StyledUserProfileContainer } from "../style";

import { useTheme } from "styled-components";
import { IError } from "@custom-types/apiError";

interface UserProfileTabProps {
	userData: {
		username: string;
		email: string;
	};
}

type FormFields = {
	username: string;
	email: string;
};

export const UserProfileTab = ({ userData }: UserProfileTabProps) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [updateUser] = useUpdateUserMutation();
	const theme = useTheme();
	const { t } = useTranslation();

	const [formError, setFormError] = useState<string | null>(null);
	const [apiError, setApiError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		defaultValues: {
			username: userData?.username || "",
			email: userData?.email || "",
		},
	});

	const onSubmit = async (data: FormFields) => {
		setFormError(null);
		setApiError(null);

		const changedFields: Partial<FormFields> = {};
		if (data.username !== userData?.username)
			changedFields.username = data.username;
		if (data.email !== userData?.email) changedFields.email = data.email;

		if (Object.keys(changedFields).length === 0) {
			setFormError(t("changeOneField"));
			return;
		}

		setIsLoading(true);
		try {
			await updateUser({ user: changedFields }).unwrap();
			setIsEditDialogOpen(false);
		} catch (error) {
			const errorMessage =
				(error as IError)?.data?.error?.message || t("failedUpdateProfile");
			setApiError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				{t("welcomeFirst")}, {userData?.username || "User"} {t("welcomeTwo")}
			</Typography>

			<StyledUserProfileContainer
				sx={{
					backgroundColor: "white",
					padding: 3,
					borderRadius: 2,
					marginTop: 3,
				}}>
				<Stack spacing={3}>
					<Typography variant="h6">{t("personalInfo")}</Typography>
					<Stack spacing={2}>
						<Typography>
							<strong>{t("userName")}:</strong> {userData?.username || "N/A"}
						</Typography>
						<Typography>
							<strong>{t("email")}:</strong> {userData?.email || "N/A"}
						</Typography>
					</Stack>
					<Button
						variant="primary"
						size="small"
						onClick={() => setIsEditDialogOpen(true)}
						startIcon={<EditIcon sx={{ fontSize: 20 }} />}
						sx={{
							borderRadius: "20px",
							padding: "8px 24px",
							transition: "all 0.3s ease",
							boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
							},
							alignSelf: "flex-start",
						}}>
						{t("editProfile")}
					</Button>
				</Stack>
			</StyledUserProfileContainer>

			<Dialog
				open={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}>
				<DialogTitle sx={{ textAlign: "center" }}>
					{t("editProfile")}
				</DialogTitle>
				<DialogContent>
					<Stack spacing={3} sx={{ marginTop: 2 }}>
						{(formError || apiError) && (
							<Typography color="error" textAlign="center">
								{formError || apiError}
							</Typography>
						)}
						<Stack spacing={1}>
							<Typography variant="body1">{t("userName")}</Typography>
							<FormField<FormFields>
								name="username"
								placeholder={userData?.username || t("userName")}
								register={register}
								icon={<PersonIcon sx={{ color: theme.colors.green }} />}
								validation={{
									minLength: {
										value: 3,
										message: t("usernameMinChar"),
									},
								}}
								error={errors.username?.message}
							/>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="body1">{t("email")}</Typography>
							<FormField<FormFields>
								name="email"
								placeholder={userData?.email || t("email")}
								register={register}
								icon={<EmailIcon sx={{ color: theme.colors.green }} />}
								validation={{
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: t("invalidEmail"),
									},
								}}
								error={errors.email?.message}
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
						onClick={() => setIsEditDialogOpen(false)}
						sx={{ minWidth: "120px" }}>
						{t("cancel")}
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit(onSubmit)}
						isLoading={isLoading}
						sx={{ minWidth: "120px" }}>
						{t("saveChanges")}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

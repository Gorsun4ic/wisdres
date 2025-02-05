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
				Personal Information
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
							<strong>Username:</strong> {userData?.username}
						</Typography>
						<Typography>
							<strong>Email:</strong> {userData?.email}
						</Typography>
					</Stack>
					<Button
						variant="primary"
						size="small"
						onClick={() => setIsPasswordDialogOpen(true)}
						startIcon={<LockIcon />}>
						Change Password
					</Button>
				</Stack>
			</Box>

			<Dialog
				open={isPasswordDialogOpen}
				onClose={() => setIsPasswordDialogOpen(false)}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>Change Password</DialogTitle>
					<DialogContent>
						<Stack spacing={2} sx={{ marginTop: 2 }}>
							<Stack spacing={1}>
								<Typography variant="body1">Current Password</Typography>
								<PasswordField
									name="currentPassword"
									placeholder="Enter your current password"
									register={register}
									error={errors.currentPassword?.message}
								/>
							</Stack>
							<Stack spacing={1}>
								<Typography variant="body1">New Password</Typography>
								<PasswordField
									name="newPassword"
									placeholder="Enter your new password"
									register={register}
									error={errors.newPassword?.message}
								/>
							</Stack>
							<Stack spacing={1}>
								<Typography variant="body1">Confirm New Password</Typography>
								<PasswordField
									name="confirmPassword"
									placeholder="Confirm your new password"
									register={register}
									validation={{
										validate: (value: string) => {
											if (watch("newPassword") !== value) {
												return "Passwords do not match";
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
							Cancel
						</Button>
						<Button
							variant="primary"
							type="submit"
							isLoading={isLoading}
							sx={{ minWidth: "120px" }}>
							Update Password
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

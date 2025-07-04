import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

// MUI Components
import { Stack } from "@mui/material";
// Custom API
import { useResetPasswordMutation } from "@api/apiUsersSlice";

// Custom components
import PasswordField from "@components/passwordField/PasswordField";
import Button from "@components/button/Button";

import { StyledForm } from "./style";

// Form Fields
type FormFields = {
	password: string;
	passwordConfirm: string;
};

const UserResetPasswordPage = () => {
	const { token } = useParams();
	const { t } = useTranslation();

	// RTK Query Add function, error
	const [resetPassword, { error: resetError }] = useResetPasswordMutation();

	const navigate = useNavigate();
	// RHF functions / data
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
		watch,
	} = useForm<FormFields>();
	const [success, setSuccess] = useState(false);

	// If registration was successful - clear form and navigate to Sign In form
	useEffect(() => {
		if (isSubmitSuccessful && !resetError) {
			const congratsTimer = setTimeout(() => {
				setSuccess(true);
			}, 1000);

			const resetTimer = setTimeout(() => {
				reset();
				navigate("/");
			}, 3000);

			return () => {
				clearTimeout(resetTimer);
				clearTimeout(congratsTimer);
			};
		} else {
			setSuccess(false);
		}
	}, [isSubmitSuccessful, resetError, reset]);

	const onSubmit = (data: FormFields) => {
		resetPassword({ token, password: data.password });
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">{t("resetPassword")}</h2>
			<Stack
				direction="column"
				spacing={2}
				sx={{ padding: "0 32px 32px 32px" }}>
				{!success && (
					<>
						<PasswordField<FormFields>
							name="password"
							register={register}
							validation={{ required: t("enterCurrentPassword") }}
							error={errors.password?.message}
						/>
						<PasswordField
							name="passwordConfirm"
							register={register}
							validation={{
								required: t("enterCurrentPassword"),
								validate: (value: string) => {
									if (watch("password") !== value) {
										return t("passwordIncorrect");
									}
								},
							}}
							error={errors.passwordConfirm?.message}
						/>
					</>
				)}
				<Button size="big" type="submit">
					{t("setNewPassword")}
				</Button>
			</Stack>
		</StyledForm>
	);
};

export default UserResetPasswordPage;

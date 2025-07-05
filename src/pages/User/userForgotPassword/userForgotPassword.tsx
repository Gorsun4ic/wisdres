import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// React Hook Form
import { useForm } from "react-hook-form";

// React router DOM
import { Link } from "react-router-dom";

// MUI Components
import { Stack, Box } from "@mui/material";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Custom API
import { useForgotPasswordMutation } from "@api/apiUsersSlice";

// Custom types
import { IError } from "@custom-types/apiError";

// Custom components
import FormField from "@components/formField";
import Button from "@components/button/button";

import { StyledForm } from "./style";

// Form Fields
type FormFields = {
	email: string;
	password: string;
};

const UserForgotPasswordPage = () => {
	// RTK Query Add function, error
	const [verifyEmail, { error: verificationError, data }] =
		useForgotPasswordMutation();

	const { t } = useTranslation();

	const [invalidFieldValue, setInvalidFieldValue] = useState<string>("");
	const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);

	// RHF functions / data
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		watch,
	} = useForm<FormFields>();

	const currentFieldValue = watch("email");

	useEffect(() => {
		if (verificationError) {
			setInvalidFieldValue(currentFieldValue);
		}
	}, [verificationError, currentFieldValue]);

	useEffect(() => {
		if (verificationError) {
			const message = (verificationError as IError)?.data?.error?.message;

			if (currentFieldValue !== invalidFieldValue) {
				setDisabledSubmit(false);
				setInvalidFieldValue("");
				return;
			}

			setDisabledSubmit(true);
			setError("email", {
				type: "server",
				message,
			});
		}
	}, [currentFieldValue, invalidFieldValue, setError, verificationError]);

	const onSubmit = (data: FormFields) => {
		if (disabledSubmit) return;
		setSuccess(true);
		verifyEmail(data.email);
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">{t("forgotPassword")}</h2>
			{!success && (
				<p className="form-description">{t("forgotPasswordDescription")}</p>
			)}
			<Stack
				direction="column"
				spacing={2}
				sx={{ padding: "0 32px 32px 32px" }}>
				{!success && (
					<FormField<FormFields>
						name="email"
						placeholder="Email Address"
						register={register}
						icon={<EmailIcon />}
						validation={{
							required: t("emailRequired"),
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: t("invalidEmail"),
							},
						}}
						error={errors.email?.message}
					/>
				)}
				{success && <p className="success">{data?.message}</p>}
				{!success && (
					<Button type="submit" disabled={disabledSubmit}>
						{t("sendResetLink")}
					</Button>
				)}
			</Stack>
			<Box>
				<Link to="/sign-in">
					<Stack
						direction="row"
						sx={{ alignItems: "center", justifyContent: "center" }}>
						<ArrowBackIcon />
						<p>{t("backToLogin")}</p>
					</Stack>
				</Link>
			</Box>
		</StyledForm>
	);
};

export default UserForgotPasswordPage;

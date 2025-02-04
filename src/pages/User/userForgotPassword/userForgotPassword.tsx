import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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
import Button from "@components/button";

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

	const navigate = useNavigate();
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
	}, [verificationError]);

	useEffect(() => {
		console.log(data)
	}, [data]);

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
	}, [currentFieldValue, invalidFieldValue]);

	const onSubmit = (data: FormFields) => {
		if (disabledSubmit) return;
		setSuccess(true)
		verifyEmail(data);
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">Forgot Password</h2>
			{!success && (
				<p className="form-description">
					Enter your email address and we will send you a link to reset your
					password.
				</p>
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
							required: "Email address is required",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Email address is not correct",
							},
						}}
						error={errors.email?.message}
					/>
				)}
				{success && <p className="success">{data?.message}</p>}
				{!success && (
					<Button size="big" type="submit" disabled={disabledSubmit}>
						Send reset Link
					</Button>
				)}
			</Stack>
			<Box>
				<Link to="/sign-in">
					<Stack
						direction="row"
						sx={{ alignItems: "center", justifyContent: "center" }}>
						<ArrowBackIcon />
						<p>Back to Login</p>
					</Stack>
				</Link>
			</Box>
		</StyledForm>
	);
};

export default UserForgotPasswordPage;

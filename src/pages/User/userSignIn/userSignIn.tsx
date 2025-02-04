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

// Custom API
import { useAuthorizeUserMutation } from "@api/apiUsersSlice";

// Custom types
import { IError } from "@custom-types/apiError";

// Custom components
import FormField from "@components/formField";
import PasswordField from "@components/passwordField/PasswordField";
import Button from "@components/button";

import { StyledForm } from "./style";

// Form Fields
type FormFields = {
	email: string;
	password: string;
};

const UserSignInPage = () => {
	// RTK Query Add function, error
	const [authorizeUser, { error: authorizationError }] =
		useAuthorizeUserMutation();

	const navigate = useNavigate();
	const [invalidFieldValue, setInvalidFieldValue] = useState<string>("");
	const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);

	// RHF functions / data
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		watch,
	} = useForm<FormFields>();

	const currentFieldsValue = watch();

	useEffect(() => {
		if (authorizationError) {
			const field = (authorizationError as IError)?.data?.error?.field;

			if (field) {
				const fieldKey = field as keyof FormFields;
				const currentValue = currentFieldsValue[fieldKey] as string;
				setInvalidFieldValue(currentValue);
			}
		}
	}, [authorizationError]);

	useEffect(() => {
		if (authorizationError) {
			const field = (authorizationError as IError)?.data?.error?.field;
			const message = (authorizationError as IError)?.data?.error?.message;

			if (field) {
				const fieldKey = field as keyof FormFields;
				const currentValue = currentFieldsValue[fieldKey] as string;

				if (currentValue !== invalidFieldValue) {
					setDisabledSubmit(false);
					setInvalidFieldValue("");
					return;
				}

				setDisabledSubmit(true);
				setError(field as keyof FormFields, {
					type: "server",
					message,
				});
			}
		}
	}, [currentFieldsValue, invalidFieldValue]);

	const onSubmit = (data: FormFields) => {
		if (disabledSubmit) return;
		authorizeUser(data);
		navigate(-1);
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">Welcome Back!</h2>
			<Stack
				direction="column"
				spacing={2}
				sx={{ padding: "0 32px 32px 32px" }}>
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
				<PasswordField<FormFields>
					name="password"
					register={register}
					validation={{ required: "The password is required" }}
					error={errors.password?.message}
				/>
				<Link to="/forgot-password">Forgot password?</Link>
				<Button size="big" type="submit" disabled={disabledSubmit}>
					Login
				</Button>
			</Stack>
			<Box>
				<p>
					Don't have an account? <Link to="/sign-up">Sign up</Link>
				</p>
			</Box>
		</StyledForm>
	);
};

export default UserSignInPage;

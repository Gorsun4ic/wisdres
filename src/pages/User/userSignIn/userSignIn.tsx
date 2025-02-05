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
	// RTK Query Add function, error, and isSuccess status
	const [authorizeUser, { error: authorizationError, isSuccess }] =
		useAuthorizeUserMutation();

	const navigate = useNavigate();
	const [invalidFieldValue, setInvalidFieldValue] = useState<string>("");
	const [errorField, setErrorField] = useState<keyof FormFields | null>(null);

	// RHF functions / data
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		setError,
		watch,
	} = useForm<FormFields>();

	const currentFieldsValue = watch();
	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem("isAuthenticated", "true");
			navigate("/"); // Navigate after successful authentication
		}
	}, [isSuccess, navigate]);

	// Handle server errors

	useEffect(() => {
		if (authorizationError) {
			const field = (authorizationError as IError)?.data?.error?.field;
			if (field) {
				const fieldKey = field as keyof FormFields;
				const currentValue = currentFieldsValue[fieldKey] as string;
				const message = (authorizationError as IError)?.data?.error?.message;
				setInvalidFieldValue(currentValue);
				setErrorField(fieldKey);
				setError(fieldKey, {
					type: "server",
					message,
				});
			}
		}
	}, [authorizationError]);

	const onSubmit = (data: FormFields) => {
		// Check if the field with error has been modified
		if (errorField && currentFieldsValue[errorField] === invalidFieldValue) {
			// Re-set the error to maintain it
			setError(errorField, {
				type: "server",
				message: (authorizationError as IError)?.data?.error?.message,
			});
			return; // Don't submit if the error field hasn't changed
		}

		// Reset error tracking when submitting with changed values
		setErrorField(null);
		setInvalidFieldValue("");
		authorizeUser(data);
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
				<Button size="big" type="submit">
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

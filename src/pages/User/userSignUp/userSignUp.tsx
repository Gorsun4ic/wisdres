import { useEffect, useState } from "react";

// React Hook Form
import { useForm } from "react-hook-form";

// React router DOM
import { Link } from "react-router-dom";

// RTK Query API
import { useAddUserMutation } from "@api/apiUsersSlice";

// MUI Components
import { Stack, Box, CircularProgress } from "@mui/material";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

// Custom types
import { IError } from "@custom-types/apiError";

// Custom components
import FormField from "@components/formField";
import PasswordField from "@components/passwordField/PasswordField";
import Button from "@components/button/button";

import { StyledForm } from "./style";

// Form Fields
type FormFields = {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	acceptTerms: boolean;
};

const UserSignUpPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	// RTK Query Add function, error
	const [addUser, { error: registrationError }] = useAddUserMutation();

	// RHF functions / data
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	// If registration was successful - clear form and navigate to Sign In form
	useEffect(() => {
		if (isSubmitSuccessful && !registrationError) {
			const resetTimer = setTimeout(() => {
				// Store both states in localStorage
				localStorage.setItem("isVerifying", "true");
				localStorage.setItem("isAuthenticated", "false"); // Initially false until email is verified
			}, 1500);

			return () => {
				clearTimeout(resetTimer);
			};
		}
	}, [isSubmitSuccessful, registrationError, reset]);

	const onSubmit = async (data: FormFields) => {
		setIsLoading(true);
		try {
			await addUser(data).unwrap();
			// Show success state before redirect
			setTimeout(() => {
				localStorage.setItem("isVerifying", "true");
				localStorage.setItem("isAuthenticated", "false");
			}, 2000);
		} catch (error) {
			setIsLoading(false);
		}
	};

	if (isSubmitSuccessful && !registrationError) {
		return (
			<StyledForm>
				<h2 className="form-title">Registration Successful!</h2>
				<Stack
					direction="column"
					spacing={2}
					sx={{ padding: "0 32px 32px 32px", textAlign: "center" }}>
					<p>Account created successfully!</p>
					<p>Please check your email for a verification link.</p>
				</Stack>
			</StyledForm>
		);
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">Create Account</h2>
			<Stack
				direction="column"
				spacing={2}
				sx={{ padding: "0 32px 32px 32px" }}>
				<FormField<FormFields>
					name="username"
					placeholder="Username"
					register={register}
					icon={<PersonIcon />}
					validation={{
						required: "Username is required",
						minLength: {
							value: 3,
							message: "Username must have at least 3 characters",
						},
						pattern: {
							value: /^[a-zA-Z0-9_-\s]+$/,
							message:
								"Username can only contain letters, numbers, underscores and hyphens",
						},
					}}
					error={errors.username?.message}
				/>
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
					error={
						errors.email?.message ||
						(registrationError as IError)?.data?.error?.field === "email"
							? (registrationError as IError)?.data?.error?.message
							: undefined
					}
				/>
				<PasswordField
					name="password"
					register={register}
					error={errors.password?.message}
				/>
				<PasswordField
					name="passwordConfirm"
					register={register}
					validation={{
						required: "Password confirmation is required",
						validate: (value: string) => {
							if (watch("password") !== value) {
								return "Passwords do not match";
							}
						},
					}}
					error={errors.passwordConfirm?.message}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? <CircularProgress size={24} /> : "Sign Up"}
				</Button>
			</Stack>
			<Box>
				<p>
					Already have an account? <Link to="/sign-in">Login</Link>
				</p>
			</Box>
		</StyledForm>
	);
};

export default UserSignUpPage;

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

// React Router DOM
import { useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// React router DOM
import { Link } from "react-router-dom";

// RTK Query API
import { useAddUserMutation } from "@api/apiUsersSlice";

// Redux actions
import { processVerification } from "@reducers/auth";

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
import Button from "@components/button";

import { StyledForm } from "./style";

// Form Fields
type FormFields = {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
};
const UserSignUpPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	// RTK Query Add function, error
	const [addUser, { error: registrationError }] = useAddUserMutation();

	// React Router DOM navigate hook
	const navigate = useNavigate();

	// RHF functions / data
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	// Redux dispatch
	const dispatch = useDispatch();

	// Custom error for fields
	const emailError =
		(registrationError as IError)?.data?.error?.field === "email";
	const backendErrorText = (registrationError as IError)?.data?.error?.message;

	// If registration was successful - clear form and navigate to Sign In form
	useEffect(() => {
		if (isSubmitSuccessful && !registrationError) {
			const resetTimer = setTimeout(() => {
				reset();
				dispatch(processVerification(true));
				// navigate("/email-verification");
			}, 1500);

			return () => {
				clearTimeout(resetTimer);
			};
		}
	}, [isSubmitSuccessful, registrationError, reset]);

	const onSubmit = (data: FormFields) => {
		addUser(data);
		setIsLoading(true);
	};

	if (isSubmitSuccessful && !registrationError) {
		return (
			<div>
				<h2>Registration Successful!</h2>
				<p>Please check your email for a verification link.</p>
				<p>If you don't see the email, check your spam folder.</p>
			</div>
		);
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form-title">Welcome Back!</h2>
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
						errors.email?.message || (emailError ? backendErrorText : undefined)
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
						required: "Password is required",
						validate: (value: string) => {
							if (watch("password") !== value) {
								return "Passwords are different";
							}
						},
					}}
					error={errors.passwordConfirm?.message}
				/>
				<Button size="big" type="submit">
					{isLoading && !registrationError ? <CircularProgress /> : "Sign Up"}
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

import { useEffect, useState } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// React router DOM
import { Link } from "react-router-dom";

// RTK Query API
import { useAddUserMutation } from "@api/apiUsersSlice";

// MUI Components
import { Stack, Box } from "@mui/material";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

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
// Error type for backend's answer
type Error = {
	data: {
		success: boolean;
		error: {
			field: string;
			message: string;
		};
	};
};

const UserSignUp = () => {
	const [successfulReg, setSuccessfulReg] = useState(false);

	// RTK Query Add function, error
	const [addUser, { error: addError }] = useAddUserMutation();

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

	// Custom error for fields
	const emailError = (addError as Error)?.data?.error?.field === "email";
	const backendErrorText = (addError as Error)?.data?.error?.message;

	// If registration was successful - clear form and navigate to Sign In form
	useEffect(() => {
		if (isSubmitSuccessful && !addError) {
			// Delay one second before show congratulations with successful registration for avoid miss show
			const congratsTimer = setTimeout(() => {
				setSuccessfulReg(true);
			}, 1000);

			const resetTimer = setTimeout(() => {
				reset();
				navigate("/sign-in");
			}, 3000);

			return () => {
				clearTimeout(resetTimer);
				clearTimeout(congratsTimer);
			};
		} else {
			console.log(addError)
			setSuccessfulReg(false);
		}
	}, [isSubmitSuccessful, addError, reset]);

	const onSubmit = (data: FormFields) => {
		addUser(data);
	};

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
				{successfulReg && <p>You successfully created new account!</p>}
				<Button size="big" type="submit">
					Sign Up
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

export default UserSignUp;

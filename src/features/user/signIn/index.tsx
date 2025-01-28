import { useEffect } from "react";

// React Hook Form
import { useForm } from "react-hook-form";

// React router DOM
import { Link } from "react-router-dom";

// MUI Components
import { Stack, Box } from "@mui/material";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";

import { useAuthorizeUserMutation } from "@api/apiUsersSlice";

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

const UserSignIn = () => {
	// RTK Query Add function, error
	const [authorizeUser, { error: authorizationError, data }] = useAuthorizeUserMutation();

	// RHF functions / data
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormFields>();

	useEffect(() => {
		if (authorizationError) {
			console.log(authorizationError);
		}
		if (data) {
			console.log(data)
		}
	}, [authorizationError, data]);

	const onSubmit = (data: FormFields) => {
		authorizeUser(data)
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

export default UserSignIn;

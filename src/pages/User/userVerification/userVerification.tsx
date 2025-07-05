import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI Components
import { Stack } from "@mui/material";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";

// Custom API
import {
	useVerifyEmailMutation,
	useResendVerificationMutation,
} from "@api/apiUsersSlice";

// Custom types
import { IError } from "@custom-types/apiError";

// Custom components
import Button from "@components/button/button";
import FormField from "@components/formField";

import { StyledForm } from "./style";

type ResendVerificationForm = {
	email: string;
};

const UserVerifyEmail = () => {
	const { verificationToken } = useParams();
	const navigate = useNavigate();
	const [verifyEmail, { error: verificationError }] = useVerifyEmailMutation();
	const [resendVerification] = useResendVerificationMutation();
	const [error, setError] = useState<string | null>(null);
	const [verificationSuccess, setVerificationSuccess] =
		useState<boolean>(false);
	const [isResending, setIsResending] = useState(false);
	const [resendSuccess, setResendSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResendVerificationForm>();

	useEffect(() => {
		if (verificationToken) {
			verifyEmail(verificationToken);
		}
	}, [verifyEmail, verificationToken]);

	useEffect(() => {
		if (verificationError) {
			const errorMessage = (verificationError as IError)?.data?.error?.message;
			setError(errorMessage);
		}
	}, [verificationError]);

	useEffect(() => {
		if (!verificationError) {
			const resetTimer = setTimeout(() => {
				localStorage.setItem("isVerifying", "false");
				setVerificationSuccess(true);
			}, 3000);

			return () => {
				clearTimeout(resetTimer);
			};
		}
	}, [verificationError]);

	const onResendSubmit = async (data: ResendVerificationForm) => {
		setIsResending(true);
		try {
			await resendVerification(data.email).unwrap();
			setResendSuccess(true);
			setError(null);
		} catch (error) {
			const errorMessage = (error as IError)?.data?.error?.message;
			setError(errorMessage || "Failed to resend verification email");
		} finally {
			setIsResending(false);
		}
	};

	if (verificationError) {
		return (
			<StyledForm onSubmit={handleSubmit(onResendSubmit)}>
				{resendSuccess ? (
					<Stack
						direction="column"
						spacing={2}
						sx={{ padding: "0 32px 32px 32px", textAlign: "center" }}>
						<p>A new verification link has been sent to your email.</p>
						<p>Please check your inbox and spam folder.</p>
					</Stack>
				) : (
					<Stack
						direction="column"
						spacing={2}
						sx={{ padding: "0 32px 32px 32px" }}>
						<h2 className="form-title">Verification Link is Expired</h2>
						<p>Please enter your email to receive a new verification link.</p>
						<FormField<ResendVerificationForm>
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
							error={errors.email?.message || error || undefined}
						/>
						<Button type="submit" disabled={isResending}>
							{isResending ? "Sending..." : "Resend Verification Email"}
						</Button>
					</Stack>
				)}
			</StyledForm>
		);
	}

	if (verificationSuccess) {
		return (
			<StyledForm>
				<h2 className="form-title">Email Verified!</h2>
				<Stack
					direction="column"
					spacing={2}
					sx={{ padding: "0 32px 32px 32px", textAlign: "center" }}>
					<p>Your email has been successfully verified.</p>
					<p>Now you can log in to your account.</p>
					<Button onClick={() => navigate("/sign-in")}>Proceed to Login</Button>
				</Stack>
			</StyledForm>
		);
	}

	return (
		<StyledForm>
			<h2 className="form-title">Verifying Email</h2>
			<Stack
				direction="column"
				spacing={2}
				sx={{ padding: "0 32px 32px 32px", textAlign: "center" }}>
				<p>Please wait while we verify your email address.</p>
			</Stack>
		</StyledForm>
	);
};

export default UserVerifyEmail;

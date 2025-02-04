import { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";

// React Router DOM
import { useNavigate } from "react-router-dom";

// MUI Components
import { Stack, TextField } from "@mui/material";

// Custom API
import { useVerifyEmailMutation } from "@api/apiUsersSlice";
import { processVerification, authenticate } from "@reducers/auth";

// Custom types
import { IError } from "@custom-types/apiError";

// Custom components
import Button from "@components/button";

import { StyledForm } from "./style";

const UserVerifyEmail = () => {
	// Navigate to some page
	const navigate = useNavigate();

	// RTK Query verifying function
	const [verifyEmail, { error: verificationError }] = useVerifyEmailMutation();

	// Redux dispatch
	const dispatch = useDispatch();

	const [error, setError] = useState<string | null>(null);
	const [verificationSuccess, setVerificationSuccess] =
		useState<boolean>(false);

	useEffect(() => {
		verifyEmail(null);
	}, [verifyEmail]);

	useEffect(() => {
		if (verificationError) {
			const errorMessage = (verificationError as IError)?.data?.error?.message;
			setError(errorMessage);
		}
	}, [verificationError, setError]);

	// If registration was successful - clear form and navigate to Sign In form
	useEffect(() => {
		if (!verificationError) {
			const resetTimer = setTimeout(() => {
				dispatch(processVerification(false));
				dispatch(authenticate(true));
				setVerificationSuccess(true);
				// navigate(-3);
			}, 3000);

			return () => {
				clearTimeout(resetTimer);
			};
		}
	}, [verificationError]);

	if (verificationError) {
		return (
			<div>
				<p className="error">{error}</p>
			</div>
		);
	}

	if (verificationSuccess) {
		return (
			<div>
				<h2>Your email has been verified!</h2>
				<p>Now you can log in to your account.</p>
				<Button onClick={() => navigate("/sign-in")} size="big">
					Proceed to Login
				</Button>
			</div>
		);
	}
};

export default UserVerifyEmail;

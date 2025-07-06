import {
	VERIFICATION_EMAIL_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { sender, mailtrapClient } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, emailVerificationURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationURL}",
				emailVerificationURL
			),
			category: "Email Verification",
		});
	} catch (e) {
		console.error(`Error sending verification email: ${e}`);
		throw new Error(`Error sending verification email: ${e}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "b39454f4-2593-44d4-ad89-fef4796eaf64",
			template_variables: {
				company_info_name: "Wisdres",
				name: name,
			},
		});
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, passwordResetURL) => {
	const recipient = [{ email }];
	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				"{resetURL}",
				passwordResetURL
			),
			category: "Password reset",
		});
	} catch (e) {
		console.error(`Error sending password reset email: ${e}`);
		throw new Error(`Error sending password reset email: ${e}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Your password was successfully reset",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password reset",
		});
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};

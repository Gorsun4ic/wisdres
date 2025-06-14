import { ApiSuccess, ApiError, ApiFieldError, ApiDefaultAnswer } from "./apiResponse";

export interface IUser {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: string[];
	emailVerified?: boolean;
	emailVerificationCode?: boolean;
	emailVerificationCodeExpiresAt?: Date;
	lastLogin: Date;
}

type UserVerificationInfo =
	| "emailVerificationCode"
	| "emailVerificationCodeExpiresAt";

export type UserInput = Omit<
	IUser,
	| "_id"
	| "role"
	| "emailVerified"
	| "emailVerificationCode"
	| "emailVerificationCodeExpiresAt"
	| "lastLogin"
>;

export type IUserPatch = {
	username?: string;
	email?: string;
	password?: string;
};

type UserInfoWithoutPassword = Omit<IUser, "password" | UserVerificationInfo>;

// Get Users
export type GetUsersResponse = ApiSuccess<IUser[]> | ApiError;

// Get User
export type GetUserResponse = ApiSuccess<IUser> | ApiError;

// Add user
export type AddUserResponse = ApiSuccess<IUser> | ApiError;

// Sign In
export interface ISignInInput {
	email: string;
	password: string;
}

export type SignInResponse =
	| ApiSuccess<UserInfoWithoutPassword>
	| ApiFieldError;

// Logout response
export type LogoutResponse = ApiSuccess;

// Check auth
export type CheckAuthResponse = ApiDefaultAnswer;

//  Verify email
export type VerifyEmailResponse =
	| ApiError
	| ApiSuccess<UserInfoWithoutPassword>;

// Forgot Password
export type ForgotPasswordResponse = ApiDefaultAnswer;

// Reset Password
export type ResetPasswordResponse = ApiDefaultAnswer;

// Delete User
export type DeleteUserResponse = ApiDefaultAnswer;

// Update User
export type UpdateUserResponse = ApiSuccess<IUser> | ApiError;

// Resend verification
export type ResendVerificationResponse = ApiDefaultAnswer;
import { ApiSuccess, ApiError } from "./apiResponse";

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

export type UserInfoWithoutPassword = Omit<IUser, "password" | UserVerificationInfo>;

// Add user
export type AddUserResponse = ApiSuccess<IUser> | ApiError;

// Sign In
export interface ISignInInput {
	email: string;
	password: string;
}

//  Verify email
export type VerifyEmailResponse =
	| ApiError
	| ApiSuccess<UserInfoWithoutPassword>;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {GetUsersResponse, GetUserResponse, AddUserResponse, UserInput, IUserPatch, SignInResponse, LogoutResponse, ISignInInput, CheckAuthResponse, VerifyEmailResponse, ForgotPasswordResponse, ResetPasswordResponse, DeleteUserResponse, UpdateUserResponse, ResendVerificationResponse} from "@custom-types/user";

export const apiUsersSlice = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
		credentials: "include",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query<GetUsersResponse, void>({
			query: () => "/users",
			providesTags: [{ type: "Users", id: "LIST" }],
		}),
		getUserById: builder.query<GetUserResponse, string>({
			query: (id) => ({ url: `/users/${id}` }),
			providesTags: ["Users"],
		}),
		authorizeUser: builder.mutation<SignInResponse, ISignInInput>({
			query: (user) => ({
				url: "/users/sign-in",
				method: "POST",
				body: user,
			}),
		}),
		logoutUser: builder.mutation<LogoutResponse, void>({
			query: () => ({
				url: "/users/logout",
				method: "POST",
			}),
		}),
		checkAuth: builder.query<CheckAuthResponse, void>({
			query: () => ({ url: "users/check-auth" }),
		}),
		verifyEmail: builder.mutation<VerifyEmailResponse, string>({
			query: (token: string) => ({
				url: `/users/email-verification/${token}`,
				method: "POST",
				body: token,
			}),
		}),
		forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
			query: (email) => ({
				url: "users/forgot-password",
				method: "POST",
				body: email,
			}),
		}),
		resetPassword: builder.mutation<
			ResetPasswordResponse,
			{ token: string; password: string }
		>({
			query: ({ token, password }) => ({
				url: `users/reset-password/:${token}`,
				method: "POST",
				body: { token, password },
			}),
		}),
		addUser: builder.mutation<AddUserResponse, UserInput>({
			query: (user) => ({
				url: "/users/sign-up",
				method: "POST",
				body: user,
			}),
			invalidatesTags: [{ type: "Users", id: "LIST" }],
		}),
		deleteUser: builder.mutation<DeleteUserResponse, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		updateUser: builder.mutation<UpdateUserResponse, { id: string; updates: IUserPatch }>({
			query: ({ id, updates }) => ({
				url: `/users/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Users"],
		}),
		resendVerification: builder.mutation<ResendVerificationResponse, string>({
			query: (email: string) => ({
				url: "/users/resend-verification",
				method: "POST",
				body: { email },
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAuthorizeUserMutation,
	useAddUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useLazyGetUserByIdQuery,
	useCheckAuthQuery,
	useLogoutUserMutation,
	useVerifyEmailMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useResendVerificationMutation,
} = apiUsersSlice;

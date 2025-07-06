import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiSuccess } from "@src/types/apiResponse";
import {
	UserInfoWithoutPassword,
	UserInput,
	IUserPatch,
	ISignInInput,
	VerifyEmailResponse,
	IUser,
} from "@custom-types/user";

export const apiUsersSlice = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.CLIENT_URL}/api`,
		credentials: "include",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query<ApiSuccess<IUser[]>, void>({
			query: () => "/users",
			providesTags: [{ type: "Users", id: "LIST" }],
		}),
		getUserById: builder.query<ApiSuccess<IUser>, string>({
			query: (id) => ({ url: `/users/${id}` }),
			providesTags: ["Users"],
		}),
		authorizeUser: builder.mutation<
			ApiSuccess<UserInfoWithoutPassword>,
			ISignInInput
		>({
			query: (user) => ({
				url: "/users/sign-in",
				method: "POST",
				body: user,
			}),
		}),
		logoutUser: builder.mutation<ApiSuccess, void>({
			query: () => ({
				url: "/users/logout",
				method: "POST",
				credentials: "include",
			}),
		}),
		checkAuth: builder.query<ApiSuccess<IUser>, void>({
			query: () => ({ url: "users/check-auth" }),
		}),
		verifyEmail: builder.mutation<VerifyEmailResponse, string>({
			query: (token: string) => ({
				url: `/users/email-verification/${token}`,
				method: "POST",
				body: token,
			}),
		}),
		forgotPassword: builder.mutation<ApiSuccess, string>({
			query: (email) => ({
				url: "users/forgot-password",
				method: "POST",
				body: email,
			}),
		}),
		resetPassword: builder.mutation<
			ApiSuccess,
			{ token: string; password: string }
		>({
			query: ({ token, password }) => ({
				url: `users/reset-password/:${token}`,
				method: "POST",
				body: { token, password },
			}),
		}),
		addUser: builder.mutation<ApiSuccess<IUser>, UserInput>({
			query: (user) => ({
				url: "/users/sign-up",
				method: "POST",
				body: user,
			}),
			invalidatesTags: [{ type: "Users", id: "LIST" }],
		}),
		deleteUser: builder.mutation<ApiSuccess, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		updateUser: builder.mutation<
			ApiSuccess<IUser>,
			{ id: string; updates: IUserPatch }
		>({
			query: ({ id, updates }) => ({
				url: `/users/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Users"],
		}),
		resendVerification: builder.mutation<ApiSuccess, string>({
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

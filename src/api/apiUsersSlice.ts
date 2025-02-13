import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import IUser from "@custom-types/user";

export const apiUsersSlice = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
		credentials: "include",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			providesTags: [{ type: "Users", id: "LIST" }],
		}),
		getUserById: builder.query({
			query: (id) => ({
				url: `/users/${id}`,
				providesTags: ["Users"],
			}),
		}),
		authorizeUser: builder.mutation({
			query: (user) => ({
				url: "/users/sign-in",
				method: "POST",
				body: user,
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: "/users/logout",
				method: "POST",
			}),
		}),
		checkAuth: builder.query<{success: boolean, user: IUser}, null>({
			query: () => ({
				url: "users/check-auth",
			}),
		}),
		verifyEmail: builder.mutation({
			query: (token: string) => ({
				url: `/users/email-verification/${token}`,
				method: "POST",
				body: token,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: "users/forgot-password",
				method: "POST",
				body: email,
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ token, password }) => ({
				url: `users/reset-password/:${token}`,
				method: "POST",
				body: { token, password },
			}),
		}),
		addUser: builder.mutation({
			query: (user) => ({
				url: "/users/sign-up",
				method: "POST",
				body: user,
			}),
			invalidatesTags: [{ type: "Users", id: "LIST" }],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		updateUser: builder.mutation({
			query: ({ id, updated }) => ({
				url: `/users/${id}`,
				method: "PATCH",
				body: updated,
			}),
			invalidatesTags: ["Users"],
		}),
		resendVerification: builder.mutation({
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

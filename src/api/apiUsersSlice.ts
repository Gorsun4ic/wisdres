import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
		checkAuth: builder.query({
			query: () => ({
				url: "users/check-auth",
			}),
		}),
		verifyEmail: builder.mutation({
			query: (code) => ({
				url: "users/email-verification",
				method: "POST",
				body: code,
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
	useResetPasswordMutation
} = apiUsersSlice;

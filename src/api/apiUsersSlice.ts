import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiUsersSlice = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000", credentials: "include"},),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			providesTags: ["Users"],
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
			})
		}),
		checkAuth: builder.query({
			query: () => ({
				url: "users/check-auth"
			}) 
		}),
		addUser: builder.mutation({
			query: (user) => ({
				url: "/users",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["Users"],
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
	useCheckAuthQuery
} = apiUsersSlice;

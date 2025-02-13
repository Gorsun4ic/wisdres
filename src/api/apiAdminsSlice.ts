import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAdminsSlice = createApi({
	reducerPath: "adminsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Admins"],
	endpoints: (builder) => ({
		getAllAdmins: builder.query({
			query: () => "/admins",
			providesTags: ["Admins"],
		}),
		getAdminById: builder.query({
			query: (id) => `/admins/${id}`,
			providesTags: ["Admins"],
		}),
		promoteToAdmin: builder.mutation({
			query: (id) => ({
				url: `/admins/${id}/promote`,
				method: "POST",
			}),
			invalidatesTags: ["Admins"],
		}),
		demoteFromAdmin: builder.mutation({
			query: (id) => ({
				url: `/admins/${id}/demote`,
				method: "POST",
			}),
			invalidatesTags: ["Admins"],
		}),

	}),
});

export const {
	useGetAllAdminsQuery,
	useGetAdminByIdQuery,
	usePromoteToAdminMutation,
	useDemoteFromAdminMutation,
} = apiAdminsSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	GetAdminsAnswer,
	GetAdminAnswer,
	PromoteAdminAnswer,
	DemoteAdminAnswer,
} from "@custom-types/admin";

export const apiAdminsSlice = createApi({
	reducerPath: "adminsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Admins"],
	endpoints: (builder) => ({
		getAllAdmins: builder.query<GetAdminsAnswer, void>({
			query: () => "/admins",
			providesTags: ["Admins"],
		}),
		getAdminById: builder.query<GetAdminAnswer, string>({
			query: (id) => `/admins/${id}`,
			providesTags: ["Admins"],
		}),
		promoteToAdmin: builder.mutation<PromoteAdminAnswer, string>({
			query: (id) => ({
				url: `/admins/${id}/promote`,
				method: "POST",
			}),
			invalidatesTags: ["Admins"],
		}),
		demoteFromAdmin: builder.mutation<DemoteAdminAnswer, string>({
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

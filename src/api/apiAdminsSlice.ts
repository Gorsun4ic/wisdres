import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiSuccess } from "@custom-types/apiResponse";

import { IUser } from "@custom-types/roles"

type IAdminUser = IUser & {
	role: ["ADMIN"]
} 


export const apiAdminsSlice = createApi({
	reducerPath: "adminsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Admins"],
	endpoints: (builder) => ({
		getAllAdmins: builder.query<ApiSuccess<IAdminUser[]>, void>({
			query: () => "/admins",
			providesTags: ["Admins"],
		}),
		getAdminById: builder.query<ApiSuccess<IAdminUser>, string>({
			query: (id) => `/admins/${id}`,
			providesTags: ["Admins"],
		}),
		promoteToAdmin: builder.mutation<ApiSuccess<IAdminUser>, string>({
			query: (id) => ({
				url: `/admins/${id}/promote`,
				method: "POST",
			}),
			invalidatesTags: ["Admins"],
		}),
		demoteFromAdmin: builder.mutation<ApiSuccess<IUser>, string>({
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

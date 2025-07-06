import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IAuthorInput, IAuthorPatch } from "@custom-types/author";

import { ApiSuccess } from "@src/types/apiResponse";
import { IAuthor } from "@custom-types/author";

export const apiAuthorsSlice = createApi({
	reducerPath: "authorsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.CLIENT_URL}/api` }),
	tagTypes: ["Authors"],
	endpoints: (builder) => ({
		getAuthors: builder.query<ApiSuccess<IAuthor[]>, void>({
			query: () => "/authors",
			providesTags: ["Authors"],
		}),
		getAuthorById: builder.query<ApiSuccess<IAuthor>, string>({
			query: (id) => ({ url: `/authors/${id}` }),
			providesTags: ["Authors"],
		}),
		addAuthor: builder.mutation<ApiSuccess<IAuthor>, IAuthorInput>({
			query: (author) => ({
				url: "/authors",
				method: "POST",
				body: author,
			}),
			invalidatesTags: ["Authors"],
		}),
		addAuthors: builder.mutation<ApiSuccess<IAuthor[]>, IAuthorInput[]>({
			query: (authors) => ({
				url: "/authors/batch",
				method: "POST",
				body: authors,
			}),
		}),
		deleteAuthor: builder.mutation<ApiSuccess<IAuthor>, string>({
			query: (id) => ({
				url: `/authors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Authors"],
		}),
		updateAuthor: builder.mutation<
			ApiSuccess<IAuthor>,
			{ id: string; updates: IAuthorPatch }
		>({
			query: ({ id, updates }) => ({
				url: `/authors/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Authors"],
		}),
	}),
});

export const {
	useGetAuthorsQuery,
	useAddAuthorMutation,
	useAddAuthorsMutation,
	useDeleteAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
} = apiAuthorsSlice;

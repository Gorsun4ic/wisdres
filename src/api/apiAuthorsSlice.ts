import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	GetAuthorsResponse,
	GetAuthorResponse,
	AddAuthorResponse,
	AddAuthorsResponse,
	DeleteAuthorResponse,
	UpdateAuthorResponse,
	IAuthorInput,
	IAuthorPatch,
} from "@custom-types/author";

export const apiAuthorsSlice = createApi({
	reducerPath: "authorsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Authors"],
	endpoints: (builder) => ({
		getAuthors: builder.query<GetAuthorsResponse, void>({
			query: () => "/authors",
			providesTags: ["Authors"],
		}),
		getAuthorById: builder.query<GetAuthorResponse, string>({
			query: (id) => ({ url: `/authors/${id}` }),
			providesTags: ["Authors"],
		}),
		addAuthor: builder.mutation<AddAuthorResponse, IAuthorInput>({
			query: (author) => ({
				url: "/authors",
				method: "POST",
				body: author,
			}),
			invalidatesTags: ["Authors"],
		}),
		addAuthors: builder.mutation<AddAuthorsResponse, IAuthorInput[]>({
			query: (authors) => ({
				url: "/authors/batch",
				method: "POST",
				body: authors,
			}),
		}),
		deleteAuthor: builder.mutation<DeleteAuthorResponse, string>({
			query: (id) => ({
				url: `/authors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Authors"],
		}),
		updateAuthor: builder.mutation<
			UpdateAuthorResponse,
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

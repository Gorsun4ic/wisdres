import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAuthorsSlice = createApi({
	reducerPath: "authorsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Authors"],
	endpoints: (builder) => ({
		getAuthors: builder.query({
			query: () => "/authors",
			providesTags: ["Authors"],
		}),
		getAuthorById: builder.query({
			query: (id) => ({
				url: `/authors/${id}`,
				providesTags: ["Authors"],
			}),
		}),
		addAuthor: builder.mutation({
			query: (author) => ({
				url: "/authors",
				method: "POST",
				body: author,
			}),
			invalidatesTags: ["Authors"],
		}),
		deleteAuthor: builder.mutation({
			query: (id) => ({
				url: `/authors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Authors"],
		}),
		updateAuthor: builder.mutation({
			query: ({ id, updated }) => ({
				url: `/authors/${id}`,
				method: "PATCH",
				body: updated,
			}),
			invalidatesTags: ["Authors"],
		}),
	}),
});

export const {useGetAuthorsQuery, useAddAuthorMutation, useDeleteAuthorMutation, useUpdateAuthorMutation, useLazyGetAuthorByIdQuery} = apiAuthorsSlice;
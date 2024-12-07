import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiBooksSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
	tagTypes: ["Books"],
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => "/books",
			providesTags: ["Books"],
		}),
		addBook: builder.mutation({
			query: (book) => ({
				url: "/books",
				method: "POST",
				body: book,
			}),
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {useGetBooksQuery, useAddBookMutation, useDeleteBookMutation} = apiBooksSlice;
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IBookInfo } from "@custom-types/book";

export const apiBooksSlice = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Books"],
	endpoints: (builder) => ({
		getBooks: builder.query<IBookInfo[], void>({
			query: () => "/books",
			providesTags: ["Books"],
		}),
		getBookById: builder.query<IBookInfo, void>({
			query: (id) => ({
				url: `/books/${id}`,
				providesTags: ["Books"],
			}),
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
		updateBook: builder.mutation({
			query: ({ id, updated }) => ({
				url: `/books/${id}`,
				method: "PATCH",
				body: updated,
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {useGetBooksQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation, useLazyGetBookByIdQuery} = apiBooksSlice;
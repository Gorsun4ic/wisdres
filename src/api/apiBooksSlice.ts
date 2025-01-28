import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IBook } from "@custom-types/book";
import { IBookInfo } from "@custom-types/bookInfo";
import { IReview } from "@custom-types/review";
import { IBookDetails } from "@custom-types/bookDetails";

export const apiBooksSlice = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Books"],
	endpoints: (builder) => ({
		getBooks: builder.query<IBook[], void>({
			query: () => "/books",
			providesTags: ["Books"],
		}),
		getBookById: builder.query<IBook, string>({
			query: (id) => ({
				url: `/books/${id}`,
				providesTags: ["Books"],
			}),
		}),
		getBooksByGenres: builder.query<IBook[], void>({
			query: (genre) => ({
				url: `/books/genre/${genre}`,
				providedTags: ["Books"]
			})
		}),
		getBookReviews: builder.query<IReview[], void>({
			query: (id) => ({
				url: `/books/${id}/reviews`,
				providesTags: ["Reviews"],
			}),
		}),
		getBookInfo: builder.query<IBookInfo, void>({
			query: (id) => ({
				url: `/books/${id}/info`,
				providedTags: ["Books"],
			}),
		}),
		getBookDetails: builder.query<IBookDetails, void>({
			query: (id) => ({
				url: `/books/${id}/details`,
				providedTags: ["Books"],
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
			query: ({ id, updates }) => ({
				url: `/books/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {useGetBooksQuery, useGetBooksByGenresQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation, useLazyGetBookByIdQuery, useLazyGetBookReviewsQuery, useLazyGetBookDetailsQuery, useLazyGetBookInfoQuery} = apiBooksSlice;
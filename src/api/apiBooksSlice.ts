import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiSuccess } from "@custom-types/apiResponse";
import { IBook } from "@custom-types/book";
import { IReview, IReviewInput } from "@custom-types/review";
import { IBookDetails } from "@custom-types/bookDetails";

import { IBookInput, IBookPatch } from "@custom-types/book";
import { IBookInfo } from "@src/types/bookInfo";

export const apiBooksSlice = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.CLIENT_URL}/api` }),
	tagTypes: ["Books", "Reviews"],
	endpoints: (builder) => ({
		getBooks: builder.query<ApiSuccess<IBook[]>, void>({
			query: () => "/books",
			providesTags: ["Books"],
		}),
		getBookById: builder.query<ApiSuccess<IBook>, string>({
			query: (id) => ({ url: `/books/${id}` }),
			providesTags: ["Books"],
		}),
		getBooksByGenres: builder.query<
			ApiSuccess<{ books: IBook[]; totalBooks: number }>,
			{ genre: string; page?: number; limit?: number }
		>({
			query: ({ genre, page = 1, limit = 25 }) =>
				page && limit
					? `/books/genre/${genre}?page=${page}&limit=${limit}`
					: `/books/genre/${genre}`,
			providesTags: ["Books"],
		}),
		getBookReviews: builder.query<
			ApiSuccess<{
				reviews: IReview[];
				hasMore: number;
				totalReviews: number;
			}>,
			{ id: string; page?: number; limit?: number }
		>({
			query: ({ id, page = 1, limit = 3 }) =>
				`/books/${id}/reviews?page=${page}&limit=${limit}`,
			providesTags: (_, __, { id }) => [{ type: "Reviews", id }],
		}),
		getBookInfo: builder.query<ApiSuccess<IBookInfo>, string>({
			query: (id) => ({ url: `/books/${id}/info` }),
			providesTags: ["Books"],
		}),
		getBookDetails: builder.query<ApiSuccess<IBookDetails>, string>({
			query: (id) => ({ url: `/books/${id}/details` }),
			providesTags: ["Books"],
		}),
		addBook: builder.mutation<ApiSuccess<IBook>, IBookInput>({
			query: (book) => ({
				url: "/books",
				method: "POST",
				body: book,
			}),
			invalidatesTags: ["Books"],
		}),
		addBooks: builder.mutation<ApiSuccess<IBook[]>, IBookInput[]>({
			query: (books) => ({
				url: "/books/batch",
				method: "POST",
				body: books,
			}),
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation<ApiSuccess<IBook>, string>({
			query: (id) => ({
				url: `/books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
		addNewReview: builder.mutation<
			ApiSuccess<IReview>,
			{ bookId: string; review: IReviewInput }
		>({
			query: ({ bookId, review }) => ({
				url: `/books/${bookId}/reviews`, // Correct URL
				method: "POST",
				body: review,
			}),
			invalidatesTags: ["Reviews", "Books"],
		}),
		deleteReview: builder.mutation<
			ApiSuccess<IReview>,
			{ bookId: string; reviewId: string }
		>({
			query: ({ bookId, reviewId }) => ({
				url: `/books/${bookId}/reviews/${reviewId}`,
				method: "DELETE",
			}),
			invalidatesTags: (_, __, { bookId }) => [{ type: "Reviews", id: bookId }],
		}),
		updateBook: builder.mutation<
			ApiSuccess<IBook>,
			{ id: string; updates: IBookPatch }
		>({
			query: ({ id, updates }) => ({
				url: `/books/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBooksByGenresQuery,
	useAddBookMutation,
	useAddBooksMutation,
	useDeleteBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
	useGetBookReviewsQuery,
	useLazyGetBookDetailsQuery,
	useLazyGetBookInfoQuery,
	useAddNewReviewMutation,
	useDeleteReviewMutation,
} = apiBooksSlice;

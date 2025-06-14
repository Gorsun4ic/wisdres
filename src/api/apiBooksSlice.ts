import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GetBooksResponse,
	GetBookResponse,
	GetBooksByGenreResponse,
	GetBookReviewsResponse,
	GetBookDetailsResponse,
	GetBookInfoResponse,
	AddBookResponse,
	AddBooksResponse,
	DeleteBookResponse,
	AddReviewResponse,
	UpdateBookResponse,
	DeleteReviewResponse,
	IBookInput,
	IBookPatch,
} from "@custom-types/book";
import { IReviewInput } from "@custom-types/review";

export const apiBooksSlice = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Books", "Reviews"],
	endpoints: (builder) => ({
		getBooks: builder.query<GetBooksResponse, void>({
			query: () => "/books",
			providesTags: ["Books"],
		}),
		getBookById: builder.query<GetBookResponse, string>({
			query: (id) => ({ url: `/books/${id}` }),
			providesTags: ["Books"],
		}),
		getBooksByGenres: builder.query<
			GetBooksByGenreResponse,
			{ genre: string; page?: number; limit?: number }
		>({
			query: ({ genre, page = 1, limit = 25 }) =>
				page && limit
					? `/books/genre/${genre}?page=${page}&limit=${limit}`
					: `/books/genre/${genre}`,
			providesTags: ["Books"],
		}),
		getBookReviews: builder.query<
			GetBookReviewsResponse,
			{ id: string; page?: number; limit?: number }
		>({
			query: ({ id, page = 1, limit = 3 }) =>
				`/books/${id}/reviews?page=${page}&limit=${limit}`,
			providesTags: ["Reviews", "Books"],
		}),
		getBookInfo: builder.query<GetBookInfoResponse, string>({
			query: (id) => ({ url: `/books/${id}/info` }),
			providesTags: ["Books"],
		}),
		getBookDetails: builder.query<GetBookDetailsResponse, string>({
			query: (id) => ({ url: `/books/${id}/details` }),
			providesTags: ["Books"],
		}),
		addBook: builder.mutation<AddBookResponse, IBookInput>({
			query: (book) => ({
				url: "/books",
				method: "POST",
				body: book,
			}),
			invalidatesTags: ["Books"],
		}),
		addBooks: builder.mutation<AddBooksResponse, IBookInput[]>({
			query: (books) => ({
				url: "/books/batch",
				method: "POST",
				body: books,
			}),
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation<DeleteBookResponse, string>({
			query: (id) => ({
				url: `/books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
		addNewReview: builder.mutation<
			AddReviewResponse,
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
			DeleteReviewResponse,
			{ bookId: string; reviewId: string }
		>({
			query: ({ bookId, reviewId }) => ({
				url: `/books/${bookId}/reviews/${reviewId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Reviews", "Books"],
		}),
		updateBook: builder.mutation<
			UpdateBookResponse,
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

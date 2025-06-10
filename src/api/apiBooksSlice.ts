import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "@custom-types/book";
import { IBookInfo } from "@custom-types/bookInfo";
import IReview from "@custom-types/review";
import { IBookDetails } from "@custom-types/bookDetails";

export const apiBooksSlice = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Books", "Reviews"],
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
		getBooksByGenres: builder.query<IBook[], {genre: string, page?: number, limit?: number}>({
			query: ({genre, page = 1, limit = 25}) => page && limit ? `/books/genre/${genre}?page=${page}&limit=${limit}` : `/books/genre/${genre}`,
			providesTags: ["Books"],
		}),
		getBookReviews: builder.query<IReview[], { id: string; page?: number; limit?: number }>({
			query: ({id, page = 1, limit = 3}) => `/books/${id}/reviews?page=${page}&limit=${limit}`,
			providesTags: ["Reviews", "Books"]
		}),
		getBookInfo: builder.query<IBookInfo, string>({
			query: (id) => ({
				url: `/books/${id}/info`,
				providesTags: ["Books"],
			}),
		}),
		getBookDetails: builder.query<IBookDetails, void>({
			query: (id) => ({
				url: `/books/${id}/details`,
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
		addNewReview: builder.mutation({
			query: ({ bookId, review }: { bookId: string; review: IReview }) => ({
				url: `/books/${bookId}/reviews`, // Correct URL
				method: "POST",
				body: review,
			}),
			invalidatesTags: ["Reviews", "Books"],
		}),
		deleteReview: builder.mutation<void, { bookId: string; reviewId: string }>({
			query: ({ bookId, reviewId }) => ({
				url: `/books/${bookId}/reviews/${reviewId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Reviews", "Books"],
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

export const {
	useGetBooksQuery,
	useGetBooksByGenresQuery,
	useAddBookMutation,
	useDeleteBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
	useGetBookReviewsQuery,
	useLazyGetBookDetailsQuery,
	useLazyGetBookInfoQuery,
	useAddNewReviewMutation,
	useDeleteReviewMutation,
} = apiBooksSlice;

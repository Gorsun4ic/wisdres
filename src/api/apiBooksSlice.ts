import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "@custom-types/book";
import { IBookInfo } from "@custom-types/bookInfo";
import { IReview } from "@custom-types/review";
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
		getBooksByGenres: builder.query<IBook[], void>({
			query: (genre) => ({
				url: `/books/genre/${genre}`,
				providesTags: ["Books"],
			}),
		}),
		getBookReviews: builder.query<IReview[], string>({
			query: (id) => `/books/${id}/reviews`,
			providesTags: (result, error, id) => [
				{ type: "Reviews", id },
				"Books",
			],
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
			query: ({ id, updates }: { id: string; updates: IReview }) => ({
				url: `/books/${id}/reviews`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: "Reviews", id },
				"Books",
			],
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
} = apiBooksSlice;

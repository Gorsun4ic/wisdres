import {
	ApiSuccess,
	ApiError,
	ApiDefaultAnswer,
} from "./apiResponse";

import { IBookInfo } from "./bookInfo";
import { IBookDetails } from "./bookDetails";

import { IReview } from "./review";

export interface IBook {
	_id?: string;
	info: IBookInfo;
	details: IBookDetails;
	reviews: string[];
};

export type IBookInput = Omit<IBook, "_id"> & {
	info: Omit<IBookInfo, "arrived">;
};

export type IBookPatch = {
	info?: Partial<Omit<IBookInfo, "arrived">>;
	details?: Partial<IBookDetails>;
}

// Get Books
export type GetBooksResponse = ApiSuccess<IBook[]> | ApiError;

// Get Book
export type GetBookResponse = ApiSuccess<IBook> | ApiError;

// Get Books by Genre
export type GetBooksByGenreResponse = ApiSuccess<{books: IBook[], totalBooks: number}> | ApiError;

// Get Reviews by book id
export type GetBookReviewsResponse = ApiSuccess<{
	reviews: IReview[];
	hasMore: number;
	totalReviews: number;
}> | ApiError;

// Get Book Details
export type GetBookDetailsResponse = ApiSuccess<IBookDetails> | ApiError;

// Get Book Info
export type GetBookInfoResponse = ApiSuccess<IBookInfo> | ApiError;

// Add Book
export type AddBookResponse = ApiSuccess<IBook> | ApiError;

// Add Books
export type AddBooksResponse = ApiSuccess<IBook[]> | ApiError;

// Delete Book
export type DeleteBookResponse = ApiSuccess<IBook> | ApiError;

// Add Review
export type AddReviewResponse = ApiSuccess<IReview> | ApiError;

// Delete Review
export type DeleteReviewResponse = ApiDefaultAnswer;

// Update Book
export type UpdateBookResponse = ApiSuccess<IBook> | ApiError;
import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";

export interface IAuthor {
	_id: string;
	id: string;
	img: string;
	title: {
		en: string;
		ua: string;
	};
	about: {
		en: string;
		ua: string;
	};
}

export type IAuthorInput = Omit<IAuthor, "_id">;

export type IAuthorPatch = {
	img?: string;
	title?: Partial<IAuthor["title"]>;
	about: Partial<IAuthor["about"]>;
};

// Get authors
export type GetAuthorsResponse = ApiSuccess<IAuthor[]> | ApiError;

// Get author
export type GetAuthorResponse = ApiSuccess<IAuthor> | ApiError;

// Add author
export type AddAuthorResponse = ApiSuccess<IAuthor> | ApiError;

// Add authors
export type AddAuthorsResponse = ApiSuccess<IAuthor[]> | ApiError;

// Delete author
export type DeleteAuthorResponse = ApiSuccess<IAuthor> | ApiError;

// Update author
export type UpdateAuthorResponse = ApiSuccess<IAuthor> | ApiError;
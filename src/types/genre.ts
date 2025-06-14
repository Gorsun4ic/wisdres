import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";

export interface IGenre {
	_id: string;
	img: {
		en: string;
		ua: string;
	};
	title: {
		en: string;
		ua: string;
	};
}

export type IGenreInput = Omit<IGenre, "_id">;

export type IGenrePatch = {
	img?: Partial<IGenre["img"]>;
	title?: Partial<IGenre["title"]>;
};

// Get Genres
export type GetGenresResponse = ApiSuccess<IGenre[]> | ApiError;

// Get Genre
export type GetGenreResponse = ApiSuccess<IGenre> | ApiError;

// Add Genre
export type AddGenreResponse = ApiSuccess<IGenre> | ApiError;

// Add Genres
export type AddGenresResponse = ApiSuccess<IGenre[]> | ApiError;

// Delete Genre
export type DeleteGenreResponse = ApiSuccess<IGenre> | ApiError;

// Update Genre
export type UpdateGenreResponse = ApiSuccess<IGenre> | ApiError;
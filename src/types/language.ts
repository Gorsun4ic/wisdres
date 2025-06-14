import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";

export interface ILanguage {
	_id: string;
	title: {
		en: string;
		ua: string;
	};
}

export type ILanguageInput = Omit<ILanguage, "_id">;

export type ILanguagePatch = Partial<ILanguage["title"]>;


// Get Languages
export type GetLanguagesResponse = ApiSuccess<ILanguage[]> | ApiError;

// Get Language
export type GetLanguageResponse = ApiSuccess<ILanguage> | ApiError;

// Add Language
export type AddLanguageResponse = ApiSuccess<ILanguage> | ApiError;

// Add Languages
export type AddLanguagesResponse = ApiSuccess<ILanguage[]> | ApiError;

// Delete Language
export type DeleteLanguageResponse = ApiSuccess<ILanguage> | ApiError;

// Update Language
export type UpdateLanguageResponse = ApiSuccess<ILanguage> | ApiError;
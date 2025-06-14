import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";

export type stringTuple = [string, string];

export interface IFilter {
	authors: stringTuple[];
	publishers: stringTuple[];
	languages: stringTuple[];
}

export interface IFilterExpanded extends IFilter {
	pages: [number, number];
}

export interface IFilterParams {
	authors: string[];
	publishers: string[];
	languages: string[];
	pages: [number, number];
}

export type GetFiltersResponse = ApiSuccess<IFilter> | ApiError;
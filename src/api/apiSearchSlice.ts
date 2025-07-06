import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "@custom-types/book";

interface SearchError {
	message: string;
}

interface SearchResult {
	id: string;
	title: string;
	type: "book" | "author" | "publisher";
	imageUrl?: string;
}

export const apiSearchSlice = createApi({
	reducerPath: "searchApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.CLIENT_URL}/api` }),
	tagTypes: ["Search", "Books"],
	endpoints: (builder) => ({
		search: builder.query<SearchResult[], string>({
			query: (searchTerm) => ({
				url: `search?q=${encodeURIComponent(searchTerm)}`,
				method: "GET",
			}),
			providesTags: ["Books", "Search"],
			transformErrorResponse: (response: {
				status: number;
				data: SearchError;
			}) => {
				return response.data.message || "Search failed";
			},
			transformResponse: (response: {
				success: boolean;
				message: string;
				data: SearchResult[];
			}) => response.data,
			serializeQueryArgs: ({ queryArgs }) => {
				return queryArgs ? queryArgs : "empty";
			},
		}),
		searchByGenre: builder.query<IBook[], string>({
			query: (genre) => ({
				url: `search/genre/${genre}`,
				method: "GET",
			}),
			providesTags: ["Books", "Search"],
			transformErrorResponse: (response: {
				status: number;
				data: SearchError;
			}) => {
				return response.data.message || "Genre search failed";
			},
		}),
	}),
});

export const {
	useSearchQuery,
	useLazySearchQuery,
	useSearchByGenreQuery,
	useLazySearchByGenreQuery,
} = apiSearchSlice;

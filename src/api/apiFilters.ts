import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiFiltersSlice = createApi({
	reducerPath: "filtersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	endpoints: (builder) => ({
		getFilterTitles: builder.query<
			[
				authors: [string, string],
				publishers: [string, string],
				languages: [string, string]
			],
			[string, string, string]
		>({
			query: (filterIds) => ({
				url: "/filters/transform-filter-ids-to-titles",
				method: "POST",
				body: filterIds,
			}),
		}),
	}),
});

export const { useGetFilterTitlesQuery } = apiFiltersSlice;

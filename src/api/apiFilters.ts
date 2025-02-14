import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiFiltersSlice = createApi({
	reducerPath: "filtersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	endpoints: (builder) => ({
		getFilterTitles: builder.query({
			query: (filterIds) => ({
				url: "/filters/transform-filter-ids-to-titles",
				method: "POST",
				body: filterIds,
			}),
		}),
	}),
});

export const {
	useGetFilterTitlesQuery,
} = apiFiltersSlice;

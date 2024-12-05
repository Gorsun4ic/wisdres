import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiBooksSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
	endpoints: builder => ({
		getBooks: builder.query({
			query: () => "/books"
		})
	})
})

export const {useGetBooksQuery} = apiBooksSlice;
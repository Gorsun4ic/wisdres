import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiPublishersSlice = createApi({
	reducerPath: "publishersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Publishers"],
	endpoints: (builder) => ({
		getPublishers: builder.query({
			query: () => "/publishers",
			providesTags: ["Publishers"],
		}),
		getPublisherById: builder.query({
			query: (id) => ({
				url: `/publishers/${id}`,
				providesTags: ["Publishers"],
			}),
		}),
		addPublisher: builder.mutation({
			query: (book) => ({
				url: "/publishers",
				method: "POST",
				body: book,
			}),
			invalidatesTags: ["Publishers"],
		}),
		deletePublisher: builder.mutation({
			query: (id) => ({
				url: `/publishers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Publishers"],
		}),
		updatePublisher: builder.mutation({
			query: ({ id, updated }) => ({
				url: `/publishers/${id}`,
				method: "PATCH",
				body: updated,
			}),
			invalidatesTags: ["Publishers"],
		}),
	}),
});

export const {
	useGetPublishersQuery,
	useAddPublisherMutation,
	useDeletePublisherMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
} = apiPublishersSlice;

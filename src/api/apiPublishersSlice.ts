import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetPublishersResponse, GetPublisherResponse, AddPublisherResponse, AddPublishersResponse, DeletePublisherResponse, UpdatePublisherResponse, IPublisherInput, IPublisherPatch } from "@custom-types/publisher";

export const apiPublishersSlice = createApi({
	reducerPath: "publishersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Publishers"],
	endpoints: (builder) => ({
		getPublishers: builder.query<GetPublishersResponse, void>({
			query: () => "/publishers",
			providesTags: ["Publishers"],
		}),
		getPublisherById: builder.query<GetPublisherResponse, string>({
			query: (id) => ({ url: `/publishers/${id}` }),
			providesTags: ["Publishers"],
		}),
		addPublisher: builder.mutation<AddPublisherResponse, IPublisherInput>({
			query: (publisher) => ({
				url: "/publishers",
				method: "POST",
				body: publisher,
			}),
			invalidatesTags: ["Publishers"],
		}),
		addPublishers: builder.mutation<AddPublishersResponse, IPublisherInput[]>({
			query: (publishers) => ({
				url: "/publishers",
				method: "POST",
				body: publishers,
			}),
			invalidatesTags: ["Publishers"],
		}),
		deletePublisher: builder.mutation<DeletePublisherResponse, string>({
			query: (id) => ({
				url: `/publishers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Publishers"],
		}),
		updatePublisher: builder.mutation<
			UpdatePublisherResponse,
			{ id: string; updates: IPublisherPatch }
		>({
			query: ({ id, updates }) => ({
				url: `/publishers/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Publishers"],
		}),
	}),
});

export const {
	useGetPublishersQuery,
	useAddPublisherMutation,
	useAddPublishersMutation,
	useDeletePublisherMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
} = apiPublishersSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiSuccess } from "@src/types/apiResponse";
import { IPublisher, IPublisherInput, IPublisherPatch } from "@custom-types/publisher";

export const apiPublishersSlice = createApi({
	reducerPath: "publishersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Publishers"],
	endpoints: (builder) => ({
		getPublishers: builder.query<ApiSuccess<IPublisher[]>, void>({
			query: () => "/publishers",
			providesTags: ["Publishers"],
		}),
		getPublisherById: builder.query<ApiSuccess<IPublisher>, string>({
			query: (id) => ({ url: `/publishers/${id}` }),
			providesTags: ["Publishers"],
		}),
		addPublisher: builder.mutation<ApiSuccess<IPublisher>, IPublisherInput>({
			query: (publisher) => ({
				url: "/publishers",
				method: "POST",
				body: publisher,
			}),
			invalidatesTags: ["Publishers"],
		}),
		addPublishers: builder.mutation<ApiSuccess<IPublisher[]>, IPublisherInput[]>({
			query: (publishers) => ({
				url: "/publishers",
				method: "POST",
				body: publishers,
			}),
			invalidatesTags: ["Publishers"],
		}),
		deletePublisher: builder.mutation<ApiSuccess<IPublisher>, string>({
			query: (id) => ({
				url: `/publishers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Publishers"],
		}),
		updatePublisher: builder.mutation<
			ApiSuccess<IPublisher>,
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

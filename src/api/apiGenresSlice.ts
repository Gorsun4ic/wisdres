import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiSuccess } from "@src/types/apiResponse";
import { IGenre, IGenreInput, IGenrePatch } from "@custom-types/genre";

export const apiGenresSlice = createApi({
	reducerPath: "GenresApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Genres"],
	endpoints: (builder) => ({
		getGenres: builder.query<ApiSuccess<IGenre[]>, void>({
			query: () => "/genres",
			providesTags: ["Genres"],
		}),
		getGenreById: builder.query<ApiSuccess<IGenre>, string>({
			query: (id) => ({ url: `/genres/${id}` }),
			providesTags: ["Genres"],
		}),
		addGenre: builder.mutation<ApiSuccess<IGenre>, IGenreInput>({
			query: (genre) => ({
				url: "/genres",
				method: "POST",
				body: genre,
			}),
			invalidatesTags: ["Genres"],
		}),
		addGenres: builder.mutation<ApiSuccess<IGenre[]>, IGenreInput[]>({
			query: (genres) => ({
				url: "/genres",
				method: "POST",
				body: genres,
			}),
			invalidatesTags: ["Genres"],
		}),
		deleteGenre: builder.mutation<ApiSuccess<IGenre>, string>({
			query: (id) => ({
				url: `/genres/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Genres"],
		}),
		updateGenre: builder.mutation<
			ApiSuccess<IGenre>,
			{ id: string; updates: Partial<IGenrePatch> }
		>({
			query: ({ id, updates }) => ({
				url: `/genres/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Genres"],
		}),
	}),
});

export const {
	useGetGenresQuery,
	useAddGenreMutation,
	useAddGenresMutation,
	useDeleteGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
} = apiGenresSlice;

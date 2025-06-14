import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetGenresResponse, GetGenreResponse, AddGenreResponse, AddGenresResponse, DeleteGenreResponse, UpdateGenreResponse, IGenreInput, IGenrePatch } from "@custom-types/genre";

export const apiGenresSlice = createApi({
	reducerPath: "GenresApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Genres"],
	endpoints: (builder) => ({
		getGenres: builder.query<GetGenresResponse, void>({
			query: () => "/genres",
			providesTags: ["Genres"],
		}),
		getGenreById: builder.query<GetGenreResponse, string>({
			query: (id) => ({ url: `/genres/${id}` }),
			providesTags: ["Genres"],
		}),
		addGenre: builder.mutation<AddGenreResponse, IGenreInput>({
			query: (genre) => ({
				url: "/genres",
				method: "POST",
				body: genre,
			}),
			invalidatesTags: ["Genres"],
		}),
		addGenres: builder.mutation<AddGenresResponse, IGenreInput[]>({
			query: (genres) => ({
				url: "/genres",
				method: "POST",
				body: genres,
			}),
			invalidatesTags: ["Genres"],
		}),
		deleteGenre: builder.mutation<DeleteGenreResponse, string>({
			query: (id) => ({
				url: `/genres/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Genres"],
		}),
		updateGenre: builder.mutation<
			UpdateGenreResponse,
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

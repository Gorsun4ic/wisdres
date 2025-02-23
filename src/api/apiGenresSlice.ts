import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiGenresSlice = createApi({
	reducerPath: "GenresApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Genres"],
	endpoints: (builder) => ({
		getGenres: builder.query({
			query: () => "/genres",
			providesTags: ["Genres"],
		}),
		getGenreById: builder.query({
			query: (id) => ({
				url: `/genres/${id}`,
				providesTags: ["Genres"],
			}),
		}),
		addGenre: builder.mutation({
			query: (genre) => ({
				url: "/genres",
				method: "POST",
				body: genre,
			}),
			invalidatesTags: ["Genres"],
		}),
		deleteGenre: builder.mutation({
			query: (id) => ({
				url: `/genres/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Genres"],
		}),
		updateGenre: builder.mutation({
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
	useDeleteGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
} = apiGenresSlice;

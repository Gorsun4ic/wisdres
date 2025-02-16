import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiLanguagesSlice = createApi({
	reducerPath: "LanguagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Languages"],
	endpoints: (builder) => ({
		getLanguages: builder.query({
			query: () => "/languages",
			providesTags: ["Languages"],
		}),
		getLanguageById: builder.query({
			query: (id) => ({
				url: `/languages/${id}`,
				providesTags: ["Languages"],
			}),
		}),
		addLanguage: builder.mutation({
			query: (language) => ({
				url: "/languages",
				method: "POST",
				body: language,
			}),
			invalidatesTags: ["Languages"],
		}),
		deleteLanguage: builder.mutation({
			query: (id) => ({
				url: `/languages/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Languages"],
		}),
		updateLanguage: builder.mutation({
			query: ({ id, updates }) => ({
				url: `/languages/${id}`,
				method: "PATCH",
				body: updates,
			}),
			invalidatesTags: ["Languages"],
		}),
	}),
});

export const {
	useGetLanguagesQuery,
	useAddLanguageMutation,
	useDeleteLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
} = apiLanguagesSlice;

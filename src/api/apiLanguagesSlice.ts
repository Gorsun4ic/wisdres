import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiSuccess } from "@src/types/apiResponse";
import { ILanguage, ILanguageInput, ILanguagePatch } from "@custom-types/language";

export const apiLanguagesSlice = createApi({
	reducerPath: "LanguagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	tagTypes: ["Languages"],
	endpoints: (builder) => ({
		getLanguages: builder.query<ApiSuccess<ILanguage[]>, void>({
			query: () => "/languages",
			providesTags: ["Languages"],
		}),
		getLanguageById: builder.query<ApiSuccess<ILanguage>, string>({
			query: (id) => ({ url: `/languages/${id}` }),
			providesTags: ["Languages"],
		}),
		addLanguage: builder.mutation<ApiSuccess<ILanguage>, ILanguageInput>({
			query: (language) => ({
				url: "/languages",
				method: "POST",
				body: language,
			}),
			invalidatesTags: ["Languages"],
		}),
		addLanguages: builder.mutation<ApiSuccess<ILanguage[]>, ILanguageInput[]>({
			query: (languages) => ({
				url: "/languages/batch",
				method: "POST",
				body: languages,
			}),
			invalidatesTags: ["Languages"],
		}),
		deleteLanguage: builder.mutation<ApiSuccess<ILanguage>, string>({
			query: (id) => ({
				url: `/languages/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Languages"],
		}),
		updateLanguage: builder.mutation<
			ApiSuccess<ILanguage>,
			{ id: string; updates: ILanguagePatch }
		>({
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
	useAddLanguagesMutation,
	useDeleteLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
} = apiLanguagesSlice;

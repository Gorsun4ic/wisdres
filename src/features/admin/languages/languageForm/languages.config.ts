import { AdminFormConfig } from "@custom-types/adminFormConfig";

import {
	useAddLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
} from "@api/apiLanguagesSlice";

export const languageFormConfig: AdminFormConfig = {
	entityName: "language",
	fields: [
		{
			name: "title",
			placeholder: "Language name",
			type: "text",
			validation: {
				required: "Name is required",
				minLength: 1,
			},
		},
	],
	mutations: {
		add: useAddLanguageMutation,
		update: useUpdateLanguageMutation,
		getById: useLazyGetLanguageByIdQuery,
	},
};

import LanguageIcon from "@mui/icons-material/Language";
import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
	useDeleteLanguageMutation,
	useGetLanguagesQuery,
} from "@api/apiLanguagesSlice";

export const languageConfig: AdminConfig = {
	entityName: "language",
	icon: <LanguageIcon />,
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
	columns: [
		{
			field: "title",
			headerName: "Title",
			width: 150,
		},
	],
	mutations: {
		add: useAddLanguageMutation,
		update: useUpdateLanguageMutation,
		getById: useLazyGetLanguageByIdQuery,
		delete: useDeleteLanguageMutation,
		getAll: useGetLanguagesQuery,
	},
};

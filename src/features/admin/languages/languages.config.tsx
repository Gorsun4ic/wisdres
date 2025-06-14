import LanguageIcon from "@mui/icons-material/Language";
import i18n from "@src/i18n";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddLanguageMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
	useDeleteLanguageMutation,
	useGetLanguagesQuery,
} from "@api/apiLanguagesSlice";

export const languageConfig = {
	entityName: "language",
	icon: <LanguageIcon />,
	fields: [
		[
			"Title",
			{
				name: "title.en",
				placeholder: "Language ",
				type: "text",
				validation: {
					required: "Language name is required",
					minLength: 1,
				},
			},
			{
				name: "title.ua",
				placeholder: "Назва мови",
				type: "text",
				validation: {
					required: "Вкажіть назву мови",
					minLength: 1,
				},
			},
		],
	],
	columns: [
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params) => params.value[i18n.language],
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

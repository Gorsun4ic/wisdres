// MUI
import LanguageIcon from "@mui/icons-material/Language";

// Get language 
import i18n, { LangType } from "@src/i18n";

// API
import {
	useAddLanguageMutation,
	useAddLanguagesMutation,
	useUpdateLanguageMutation,
	useLazyGetLanguageByIdQuery,
	useDeleteLanguageMutation,
	useGetLanguagesQuery,
	apiLanguagesSlice
} from "@api/apiLanguagesSlice";

// Types
import { AdminConfig, InferHook } from "@custom-types/adminFormConfig";

export type LanguageMutations = {
	add: InferHook<typeof apiLanguagesSlice, "addLanguage", "useMutation">;
	addMany: InferHook<typeof apiLanguagesSlice, "addLanguages", "useMutation">;
	update: InferHook<typeof apiLanguagesSlice, "updateLanguage", "useMutation">;
	getById: InferHook<
		typeof apiLanguagesSlice,
		"getLanguageById",
		"useLazyQuery"
	>;
	delete: InferHook<typeof apiLanguagesSlice, "deleteLanguage", "useMutation">;
	getAll: InferHook<typeof apiLanguagesSlice, "getLanguages", "useQuery">;
};

const lang = i18n.language as LangType;

export const languageConfig: AdminConfig<LanguageMutations> = {
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
			renderCell: (params) => params.value[lang],
		},
	],
	mutations: {
		add: useAddLanguageMutation,
		addMany: useAddLanguagesMutation,
		update: useUpdateLanguageMutation,
		getById: useLazyGetLanguageByIdQuery,
		delete: useDeleteLanguageMutation,
		getAll: useGetLanguagesQuery,
	},
};

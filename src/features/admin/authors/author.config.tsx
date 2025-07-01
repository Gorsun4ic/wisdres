import { Link } from "react-router-dom";

// MUI Components
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { GridCellParams } from "@mui/x-data-grid";

// Get language
import i18n, { LangType } from "@src/i18n";

// API Call
import {
	useAddAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
	useDeleteAuthorMutation,
	useGetAuthorsQuery,
	useAddAuthorsMutation,
	apiAuthorsSlice,
} from "@api/apiAuthorsSlice";

// Types
import { AdminConfig, InferHook } from "@src/types/adminFormConfig";

// Utils
import { validateImageType, imageTypes } from "@utils/imgValidation";

export type AuthorMutations = {
	add: InferHook<typeof apiAuthorsSlice, "addAuthor", "useMutation">;
	addMany: InferHook<typeof apiAuthorsSlice, "addAuthors", "useMutation">;
	update: InferHook<typeof apiAuthorsSlice, "updateAuthor", "useMutation">;
	getById: InferHook<typeof apiAuthorsSlice, "getAuthorById", "useLazyQuery">;
	delete: InferHook<typeof apiAuthorsSlice, "deleteAuthor", "useMutation">;
	getAll: InferHook<typeof apiAuthorsSlice, "getAuthors", "useQuery">;
};

export const authorConfig: AdminConfig<AuthorMutations> = {
	entityName: "author",
	icon: <RecentActorsIcon />,
	fields: [
		{
			name: "img",
			placeholder: "Image link",
			type: "text",
			validation: {
				required: "Image is required",
				validate: (value: string) => {
					if (value && validateImageType(value)) {
						return true;
					}
					return `Image must have one of these types: ${imageTypes.join(", ")}`;
				},
			},
		},
		[
			i18n.t("title"),
			{
				name: "title.en",
				placeholder: "Author's name",
				type: "text",
				validation: {
					required: "Name is required",
					minLength: 1,
				},
			},
			{
				name: "title.ua",
				placeholder: "Ім'я автора",
				type: "text",
				validation: {
					required: "Вкажіть ім'я",
					minLength: 1,
				},
			},
		],
		[
			i18n.t("about"),
			{
				name: "about.en",
				placeholder: "About author",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Author's biography is required",
					minLength: 3,
				},
			},
			{
				name: "about.ua",
				placeholder: "Про автора",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Вкажіть біографію автора",
					minLength: 3,
				},
			},
		],
	],
	columns: [
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params: GridCellParams) => (
				<img src={params.value as string} width="40" />
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const lang = i18n.language as LangType;
				return (
					<Link to={`/author/${params.row._id}`}>
						{(params.value as Record<LangType, string>)[lang]}
					</Link>
				);
			},
		},
		{
			field: "about",
			headerName: "About",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const lang = i18n.language as LangType;
				return (params.value as Record<LangType, string>)[lang];
			},
		},
		{
			field: "books",
			headerName: "Books",
			width: 80,
			renderCell: (params: GridCellParams) => params.row.bookIds.length,
		},
	],
	mutations: {
		add: useAddAuthorMutation,
		addMany: useAddAuthorsMutation,
		update: useUpdateAuthorMutation,
		getById: useLazyGetAuthorByIdQuery,
		delete: useDeleteAuthorMutation,
		getAll: useGetAuthorsQuery,
	},
};

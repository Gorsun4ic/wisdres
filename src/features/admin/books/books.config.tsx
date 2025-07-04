import { Link } from "react-router-dom";

// MUI
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { GridCellParams } from "@mui/x-data-grid";

// Get language
import i18n, { LangType } from "@src/i18n";

// API
import {
	useAddBookMutation,
	useAddBooksMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
	useDeleteBookMutation,
	useGetBooksQuery,
	apiBooksSlice,
} from "@api/apiBooksSlice";

// Utils
import { validateImageType, imageTypes } from "@utils/imgValidation";
import { getLangEntity } from "@utils/getLangEntity";

// Types
import { AdminConfig, InferHook } from "@src/types/adminFormConfig";
import { IAuthor } from "@custom-types/author";
import { IPublisher } from "@custom-types/publisher";
import { IGenre } from "@custom-types/genre";
import { ILanguage } from "@custom-types/language";

export type BookMutations = {
	add: InferHook<typeof apiBooksSlice, "addBook", "useMutation">;
	addMany: InferHook<typeof apiBooksSlice, "addBooks", "useMutation">;
	update: InferHook<typeof apiBooksSlice, "updateBook", "useMutation">;
	getById: InferHook<typeof apiBooksSlice, "getBookById", "useLazyQuery">;
	delete: InferHook<typeof apiBooksSlice, "deleteBook", "useMutation">;
	getAll: InferHook<typeof apiBooksSlice, "getBooks", "useQuery">;
};

export const booksConfig: AdminConfig<BookMutations> = {
	entityName: "books",
	icon: <LibraryBooksIcon />,
	fields: [
		[
			i18n.t("image"),
			{
				name: "info.img.en",
				placeholder: "Image link",
				type: "text",
				validation: {
					required: "Image is required",
					validate: (value: string) => {
						if (value && validateImageType(value)) {
							return true;
						}
						return `Image must have one of these types: ${imageTypes.join(
							", "
						)}`;
					},
				},
			},
			{
				name: "info.img.ua",
				placeholder: "Посилання на зображення",
				type: "text",
				validation: {
					required: "Вкажіть зображення",
					validate: (value: string) => {
						if (value && validateImageType(value)) {
							return true;
						}
						return `Зображення повинно мати одне з наступних зображень: ${imageTypes.join(
							", "
						)}`;
					},
				},
			},
		],
		[
			i18n.t("title"),
			{
				name: "info.title.en",
				placeholder: "Book's title",
				type: "text",
				validation: {
					required: "Title is required",
					minLength: 1,
				},
			},
			{
				name: "info.title.ua",
				placeholder: "Назва книжки",
				type: "text",
				validation: {
					required: "Вкажіть назву",
					minLength: 1,
				},
			},
		],
		{
			name: "info.genre",
			label: "Genres",
			type: "autoComplete",
			rules: {
				required: "Genres are required",
			},
		},
		{
			name: "info.author",
			label: "Author",
			type: "autoComplete",
			rules: {
				required: "Author is required",
			},
		},
		{
			name: "info.publisher",
			label: "Publisher",
			type: "autoComplete",
			multiple: false,
			rules: {
				required: "Publisher is required",
			},
		},
		{
			name: "info.language",
			label: "Language",
			type: "autoComplete",
			multiple: false,
			rules: {
				required: "Language is required",
			},
		},
		{
			name: "info.year",
			label: "Year",
			placeholder: "Year",
			type: "number",
			validation: {
				required: "Year is required",
				minLength: {
					value: 3,
					message: "Year must have 3 numbers",
				},
				maxLength: {
					value: 4,
					message: "Year must have 4 numbers",
				},
			},
		},
		{
			name: "info.pages",
			label: "Pages number",
			placeholder: "Pages number",
			type: "number",
			validation: {
				required: "Pages is required",
				minLength: {
					value: 1,
					message: "Pages must have at least 1 character",
				},
			},
		},
		[
			i18n.t("link"),
			{
				name: "info.link.en",
				label: "Link",
				placeholder: "Link",
				type: "text",
				rules: {
					required: "Link is required",
				},
			},
			{
				name: "info.link.ua",
				label: "Посилання",
				placeholder: "Посилання",
				type: "text",
				rules: {
					required: "Вкажіть посилання",
				},
			},
		],
		[
			i18n.t("aboutBooks"),
			{
				name: "details.book.en",
				placeholder: "About the book",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Information about the book is required",
					minLength: {
						value: 30,
						message:
							"Information about the book must have at least 30 characters",
					},
				},
			},
			{
				name: "details.book.ua",
				placeholder: "Про книжку",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Вкажіть інформацію про книжку",
					minLength: {
						value: 30,
						message: "Опис повинен містити, щонайменше, 30 символів",
					},
				},
			},
		],
		[
			"About the auditory",
			{
				name: "details.auditory.en",
				placeholder: "About the auditory",
				type: "textarea",
				rows: 4,
				validation: {
					minLength: {
						value: 30,
						message:
							"Information about the auditory must have at least 30 characters",
					},
				},
			},
			{
				name: "details.auditory.ua",
				placeholder: "Для кого ця книжка",
				type: "textarea",
				rows: 4,
				validation: {
					minLength: {
						value: 30,
						message: "Опис аудиторії повинен містити, щонайменше, 30 символів",
					},
				},
			},
		],
	],
	columns: [
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params: GridCellParams) => {
				const lang = i18n.language as LangType;
				const value = params.value as Record<LangType, string>; 
				return <img src={getLangEntity(value, lang)} width="40" />;
			},
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const lang = i18n.language as LangType;
				const value = params.value as Record<LangType, string>; 
				return (
					<Link to={`/book/${params.row.id}`}>
						{getLangEntity(value, lang)}
					</Link>
				);
			},
		},
		{
			field: "author",
			headerName: "Author",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const value = params.value as IAuthor[];
				const lang = i18n.language as LangType;
				return value.map((author: IAuthor, index: number, arr: IAuthor[]) => {
					return (
						(value && (
							<Link key={author._id} to={`/author/${author._id}`}>
								{author.title[lang]}
								{index < arr.length - 1 ? ", " : ""}
							</Link>
						)) ||
						"Unknown Author"
					);
				});
			},
		},
		{
			field: "publisher",
			headerName: "Publisher",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const publisher = params.value as IPublisher | undefined;

				return publisher ? (
					<Link to={`/publisher/${publisher._id}`}>{publisher.title}</Link>
				) : (
					"Unknown Publisher"
				);
			},
		},
		{
			field: "genre",
			headerName: "Genres",
			width: 150,
			renderCell: (params: GridCellParams) => {
				const value = params.value as IGenre[];
				const lang = i18n.language as LangType;
				return value.map((genre: IGenre, index: number, arr: IGenre[]) => {
					return (
						(value && (
							<Link key={genre._id} to={`/genre/${genre._id}`}>
								{(genre.title as Record<LangType, string>)[lang]}
								{index < arr.length - 1 ? ", " : ""}
							</Link>
						)) ||
						"Unknown Genre"
					);
				});
			},
		},
		{
			field: "language",
			headerName: "Language",
			width: 80,
			renderCell: (params: GridCellParams) => {
				const value = params.value as ILanguage | undefined;
				const lang = i18n.language as LangType;
				return (value && value.title[lang]) || "Unknown Language";
			},
		},
		{
			field: "year",
			headerName: "Year",
			width: 60,
			type: "number",
			renderCell: (params: GridCellParams) => {
				return params.value as string;
			},
		},
		{
			field: "pages",
			headerName: "Pages",
			width: 60,
			type: "number",
			renderCell: (params: GridCellParams) => {
				return params.value as string;
			},
		},
		{
			field: "reviews",
			headerName: "Reviews",
			width: 80,
			type: "number",
			renderCell: (params: GridCellParams) => {
				return (params.value as string[]).length;
			},
		},
	],
	mutations: {
		add: useAddBookMutation,
		addMany: useAddBooksMutation,
		update: useUpdateBookMutation,
		getById: useLazyGetBookByIdQuery,
		delete: useDeleteBookMutation,
		getAll: useGetBooksQuery,
	},
};

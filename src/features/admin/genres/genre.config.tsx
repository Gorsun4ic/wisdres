import { Link } from "react-router-dom";

// MUI
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

// Get language
import i18n from "@src/i18n";
import { lang } from "@src/i18n";

// API
import {
	useAddGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
	useDeleteGenreMutation,
	useGetGenresQuery,
	apiGenresSlice
} from "@api/apiGenresSlice";

// Types
import { AdminConfig, InferHook } from "@src/types/adminFormConfig";

// Utils
import { validateImageType, imageTypes } from "@utils/imgValidation";

export type GenreMutations = {
	add: InferHook<typeof apiGenresSlice, "addGenre", "useMutation">;
	update: InferHook<typeof apiGenresSlice, "updateGenre", "useMutation">;
	getById: InferHook<typeof apiGenresSlice, "getGenreById", "useLazyQuery">;
	delete: InferHook<typeof apiGenresSlice, "deleteGenre", "useMutation">;
	getAll: InferHook<typeof apiGenresSlice, "getGenres", "useQuery">;
};

export const genreConfig: AdminConfig<GenreMutations> = {
	entityName: "genre",
	icon: <TheaterComedyIcon />,
	fields: [
		[
			i18n.t("image"),
			{
				name: "img.en",
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
				name: "img.ua",
				placeholder: "Посилання на зображення",
				type: "text",
				validation: {
					required: "Вкажіть зображення",
					validate: (value: string) => {
						if (value && validateImageType(value)) {
							return true;
						}
						return `Зображення повинно бути одного з наступних розширень: ${imageTypes.join(
							", "
						)}`;
					},
				},
			},
		],
		[
			i18n.t("title"),
			{
				name: "title.en",
				placeholder: "Genre's name",
				type: "text",
				validation: {
					required: "Name is required",
					minLength: 1,
				},
			},
			{
				name: "title.ua",
				placeholder: "Назва жанра",
				type: "text",
				validation: {
					required: "Вкажіть назву жанру",
					minLength: 1,
				},
			},
		],
	],
	columns: [
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params) => (
				<img src={params.value[lang]} width="40" />
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params) => (
				<Link to={`/books/${params.value["en"].toLowerCase()}`}>
					{params.value[lang]}
				</Link>
			),
		},
	],
	mutations: {
		add: useAddGenreMutation,
		update: useUpdateGenreMutation,
		getById: useLazyGetGenreByIdQuery,
		delete: useDeleteGenreMutation,
		getAll: useGetGenresQuery,
	},
};

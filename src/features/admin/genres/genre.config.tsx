import { Link } from "react-router-dom";

import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import i18n from "../../../i18n.js";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
	useDeleteGenreMutation,
	useGetGenresQuery,
} from "@api/apiGenresSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const genreConfig = {
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
				<img src={params.value[i18n.language]} width="40" />
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params) => (
				<Link to={`/books/${params.value["en"].toLowerCase()}`}>
					{params.value[i18n.language]}
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

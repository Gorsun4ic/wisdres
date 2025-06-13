import { Link } from "react-router-dom";

import RecentActorsIcon from "@mui/icons-material/RecentActors";
import i18n from "../../../i18n.js"

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
	useDeleteAuthorMutation,
	useGetAuthorsQuery,
	useAddAuthorsMutation
} from "@api/apiAuthorsSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const authorConfig = {
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
			renderCell: (params) => <img src={params.value} width="40" />,
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params) => (
				<Link to={`/author/${params.row._id}`}>
					{params.value[i18n.language]}
				</Link>
			),
		},
		{
			field: "about",
			headerName: "About",
			width: 150,
			renderCell: (params) => params.value[i18n.language],
		},
		{
			field: "books",
			headerName: "Books",
			width: 80,
			renderCell: (params) => params.row.bookIds.length,
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

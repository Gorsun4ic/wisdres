import { Link } from "react-router-dom";

import NewspaperIcon from "@mui/icons-material/Newspaper";

import i18n from "../../../i18n.js";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddPublisherMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
	useDeletePublisherMutation,
	useGetPublishersQuery,
} from "@api/apiPublishersSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const publisherConfig = {
	entityName: "publisher",
	icon: <NewspaperIcon />,
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
		{
			name: "title",
			placeholder: "Publisher's name",
			type: "text",
			validation: {
				required: "Name is required",
				minLength: 1,
			},
		},
		[
			i18n.t("about"),
			{
				name: "about.en",
				placeholder: "About publisher",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Publisher's info is required",
					minLength: 3,
				},
			},
			{
				name: "about.ua",
				placeholder: "Про видавництво",
				type: "textarea",
				rows: 4,
				validation: {
					required: "Вкажіть інформацію про видавництво",
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
				<Link to={`/publisher/${params.row._id}`}>
					{params.value}
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
		add: useAddPublisherMutation,
		update: useUpdatePublisherMutation,
		getById: useLazyGetPublisherByIdQuery,
		delete: useDeletePublisherMutation,
		getAll: useGetPublishersQuery,
	},
};

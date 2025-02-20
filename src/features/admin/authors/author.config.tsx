import { Link } from "react-router-dom";

import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
	useDeleteAuthorMutation,
	useGetAuthorsQuery,
} from "@api/apiAuthorsSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const authorConfig: AdminConfig = {
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
		{
			name: "title",
			placeholder: "Author's name",
			type: "text",
			validation: {
				required: "Name is required",
				minLength: 1,
			},
		},
		{
			name: "about",
			placeholder: "About author",
			type: "textarea",
			rows: 4,
			validation: {
				required: "Author's info is required",
				minLength: 3,
			},
		},
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
				<Link to={`/author/${params.row._id}`}>{params.value}</Link>
			),
		},
		{
			field: "about",
			headerName: "About",
			width: 150,
		},
		{
			field: "books",
			headerName: "Books",
			width: 80,
			renderCell: (params) => (
				params.row.bookIds.length
			)
		}
	],
	mutations: {
		add: useAddAuthorMutation,
		update: useUpdateAuthorMutation,
		getById: useLazyGetAuthorByIdQuery,
		delete: useDeleteAuthorMutation,
		getAll: useGetAuthorsQuery,
	},
};

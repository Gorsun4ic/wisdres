import NewspaperIcon from "@mui/icons-material/Newspaper";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddPublisherMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
	useDeletePublisherMutation,
	useGetPublishersQuery,
} from "@api/apiPublishersSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const publisherConfig: AdminConfig = {
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
		{
			name: "about",
			placeholder: "About publisher",
			type: "textarea",
			rows: 4,
			validation: {
				required: "Publisher's info is required",
				minLength: 3,
			},
		},
	],
	columns: [
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params: {value: string}) => <img src={params.value} width="40" />,
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
		},
		{
			field: "about",
			headerName: "About",
			width: 150,
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

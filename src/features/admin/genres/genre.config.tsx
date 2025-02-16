import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
	useDeleteGenreMutation,
	useGetGenresQuery,
} from "@api/apiGenresSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const genreConfig: AdminConfig = {
	entityName: "genre",
	icon: <TheaterComedyIcon />,
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
			placeholder: "Genre's name",
			type: "text",
			validation: {
				required: "Name is required",
				minLength: 1,
			},
		},
	],
	columns: [		{
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
	],
	mutations: {
		add: useAddGenreMutation,
		update: useUpdateGenreMutation,
		getById: useLazyGetGenreByIdQuery,
		delete: useDeleteGenreMutation,
		getAll: useGetGenresQuery,
	},
};

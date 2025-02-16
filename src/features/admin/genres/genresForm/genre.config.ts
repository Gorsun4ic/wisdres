import { AdminFormConfig } from "@custom-types/adminFormConfig";

import {
	useAddGenreMutation,
	useUpdateGenreMutation,
	useLazyGetGenreByIdQuery,
} from "@api/apiGenresSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const genreFormConfig: AdminFormConfig = {
	entityName: "genre",
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
		}
	],
	mutations: {
		add: useAddGenreMutation,
		update: useUpdateGenreMutation,
		getById: useLazyGetGenreByIdQuery,
	},
};

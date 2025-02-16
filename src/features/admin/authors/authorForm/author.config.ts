import { AdminFormConfig } from "@custom-types/adminFormConfig";

import {
	useAddAuthorMutation,
	useUpdateAuthorMutation,
	useLazyGetAuthorByIdQuery,
} from "@api/apiAuthorsSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const authorFormConfig: AdminFormConfig = {
	entityName: "author",
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
	mutations: {
		add: useAddAuthorMutation,
		update: useUpdateAuthorMutation,
		getById: useLazyGetAuthorByIdQuery,
	},
};

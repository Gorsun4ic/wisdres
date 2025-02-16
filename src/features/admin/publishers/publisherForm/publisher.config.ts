import { AdminFormConfig } from "@custom-types/adminFormConfig";

import {
	useAddPublisherMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
} from "@api/apiPublishersSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";

export const publisherFormConfig: AdminFormConfig = {
	entityName: "publisher",
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
	mutations: {
		add: useAddPublisherMutation,
		update: useUpdatePublisherMutation,
		getById: useLazyGetPublisherByIdQuery,
	},
};

import { Link } from "react-router-dom";

// MUI
import NewspaperIcon from "@mui/icons-material/Newspaper";

// Get language
import i18n, {LangType} from "@src/i18n";

// API
import {
	useAddPublisherMutation,
	useAddPublishersMutation,
	useUpdatePublisherMutation,
	useLazyGetPublisherByIdQuery,
	useDeletePublisherMutation,
	useGetPublishersQuery,
	apiPublishersSlice
} from "@api/apiPublishersSlice";

// Utils
import { validateImageType, imageTypes } from "@utils/imgValidation";

// Types
import { AdminConfig, InferHook } from "@custom-types/adminFormConfig";


export type PublisherMutations = {
	add: InferHook<typeof apiPublishersSlice, "addPublisher", "useMutation">;
	addMany: InferHook<typeof apiPublishersSlice, "addPublishers", "useMutation">;
	update: InferHook<
		typeof apiPublishersSlice,
		"updatePublisher",
		"useMutation"
	>;
	getById: InferHook<
		typeof apiPublishersSlice,
		"getPublisherById",
		"useLazyQuery"
	>;
	delete: InferHook<
		typeof apiPublishersSlice,
		"deletePublisher",
		"useMutation"
	>;
	getAll: InferHook<typeof apiPublishersSlice, "getPublishers", "useQuery">;
};

const lang = i18n.language as LangType;

export const publisherConfig: AdminConfig<PublisherMutations> = {
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
				<Link to={`/publisher/${params.row._id}`}>{params.value}</Link>
			),
		},
		{
			field: "about",
			headerName: "About",
			width: 150,
			renderCell: (params) => params.value[lang],
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
		addMany: useAddPublishersMutation,
		update: useUpdatePublisherMutation,
		getById: useLazyGetPublisherByIdQuery,
		delete: useDeletePublisherMutation,
		getAll: useGetPublishersQuery,
	},
};

import { Link } from "react-router-dom";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { AdminConfig } from "@custom-types/adminFormConfig";

import {
	useAddBookMutation,
	useUpdateBookMutation,
	useLazyGetBookByIdQuery,
	useDeleteBookMutation,
	useGetBooksQuery,
} from "@api/apiBooksSlice";

import { useGetGenresQuery } from "@api/apiGenresSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetLanguagesQuery } from "@api/apiLanguagesSlice";

import { validateImageType, imageTypes } from "@utils/imgValidation";
import { IGenre } from "@custom-types/genre";

export const booksConfig: AdminConfig = {
	entityName: "books",
	icon: <LibraryBooksIcon />,
	fields: [
		{
			name: "info.img",
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
			name: "info.title",
			placeholder: "Books title",
			type: "text",
			validation: {
				required: "Title is required",
				minLength: 1,
			},
		},
		{
			name: "info.genre",
			label: "Genres",
			type: "selectCheckboxes",
			data: useGetGenresQuery,
		},
		{
			name: "info.Author",
			label: "Author",
			type: "autoComplete",
			rules: {
				required: "Author is required",
			},
			data: useGetAuthorsQuery,
		},
		{
			name: "info.publisher",
			label: "Publisher",
			type: "autoComplete",
			rules: {
				required: "Publisher is required",
			},
			data: useGetPublishersQuery,
		},
		{
			name: "info.language",
			label: "Language",
			type: "autoComplete",
			rules: {
				required: "Language is required",
			},
			data: useGetLanguagesQuery,
		},
		{
			name: "info.year",
			label: "Year",
			placeholder: "Year",
			type: "number",
			rules: {
				required: "Year is required",
				minLength: {
					value: 3,
					message: "Year must have 3 numbers",
				},
				maxLength: {
					value: 4,
					message: "Year must have 4 numbers",
				},
			},
		},
		{
			name: "info.pages",
			label: "Pages number",
			placeholder: "Pages number",
			type: "number",
			rules: {
				required: "Pages is required",
				minLength: {
					value: 1,
					message: "Pages must have at least 1 character",
				},
			},
		},
		{
			name: "details.book",
			placeholder: "About the book",
			type: "textarea",
			rows: 4,
			rules: {
				required: "Information about the book is required",
				minLength: {
					value: 30,
					message:
						"Information about the book must have at least 30 characters",
				},
			},
		},
		{
			name: "details.auditory",
			placeholder: "About the auditory",
			type: "textarea",
			rows: 4,
			rules: {
				required: "Information about the auditory is required",
			},
		},
	],
	columns: [
		{
			field: "img",
			headerName: "Image",
			width: 80,
			renderCell: (params: { value: string }) => (
				<img src={params.value} width="40" />
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 150,
			renderCell: (params) => {
				return <Link to={`/book/${params.row.id}`}>{params.value}</Link>;
			}
		},
		{
			field: "author",
			headerName: "Author",
			width: 150,
			renderCell: (params) => {
				return params.value.map((author: IAuthor) => {
					return params.value && <Link to={`/author/${author._id}`}>{author.title}</Link> || "Unknown Author";
				});
			},
		},
		{
			field: "publisher",
			headerName: "Publisher",
			width: 150,
			renderCell: (params) => {
				return params.value && <Link to={`/publisher/${params.value?._id}`}>{params.value?.title}</Link> || "Unknown Publisher";
			},
		},
		{
			field: "genre",
			headerName: "Genres",
			width: 150,
			renderCell: (params) => {
				return params.value.map((genre: IGenre) => {
					return params.value && <Link to={`/genre/${genre._id}`}>{genre.title}</Link> || "Unknown Genre";
				});
			},
		},
		{
			field: "language",
			headerName: "Language",
			width: 80,
			renderCell: (params) => {
				return params.value && params.value.title || "Unknown Language";
			}

		},
		{
			field: "year",
			headerName: "Year",
			width: 60,
			type: "number",
		},
		{
			field: "pages",
			headerName: "Pages",
			width: 60,
			type: "number",
		},
		{
			field: "reviews",
			headerName: "Reviews",
			width: 80,
			type: "number",
			renderCell: (params) => {
				return params.value.length;
			}
		},
	],
	mutations: {
		add: useAddBookMutation,
		update: useUpdateBookMutation,
		getById: useLazyGetBookByIdQuery,
		delete: useDeleteBookMutation,
		getAll: useGetBooksQuery,
	},
};

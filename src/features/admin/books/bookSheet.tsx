import Sheet from "@features/admin/sheet";
import { booksConfig } from "./books.config";

import { useGetGenresQuery } from "@api/apiGenresSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetLanguagesQuery } from "@api/apiLanguagesSlice";

import { IBookInput } from "@src/types/book";
import { BookMutations } from "./books.config";

import i18n, { LangType } from "@src/i18n";

import { getLangEntity } from "@src/utils/getLangEntity";

const BookFormData = () => {
	const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();
	const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
	const { data: publishers, isLoading: isLoadingPublishers } =
		useGetPublishersQuery();
	const { data: languages, isLoading: isLoadingLanguages } =
		useGetLanguagesQuery();

	const lang = i18n.language as LangType;

	const mapToTitleString = <T extends { _id: string; title: string }>(
		items: T[] | undefined
	): { _id: string; title: string }[] =>
		items?.map((item) => ({
			_id: item._id,
			title: item.title,
		})) || [];

	const mapToTitleObject = <
		T extends { _id: string; title: { en: string; ua: string } }
	>(
		items: T[] | undefined
	): { _id: string; title: string }[] =>
		items?.map((item) => ({
			_id: item._id,
			title: getLangEntity(item.title, lang),
		})) || [];

	const fieldOptions = {
		"info.genre": {
			data: mapToTitleObject(genres?.data),
			isLoading: isLoadingGenres,
		},
		"info.author": {
			data: mapToTitleObject(authors?.data),
			isLoading: isLoadingAuthors,
		},
		"info.publisher": {
			data: mapToTitleString(publishers?.data),
			isLoading: isLoadingPublishers,
		},
		"info.language": {
			data: mapToTitleObject(languages?.data),
			isLoading: isLoadingLanguages,
		},
	};

	return fieldOptions;
};

const BookSheet = () => {
	const fieldOptions = BookFormData();
	return (
		<Sheet<
			IBookInput,
			BookMutations,
			typeof fieldOptions
		>
			config={booksConfig}
			fieldOptions={fieldOptions}
		/>
	);
};

export default BookSheet;

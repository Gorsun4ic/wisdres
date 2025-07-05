import Sheet from "@features/admin/sheet";
import { booksConfig } from "./books.config";

import { useGetGenresQuery } from "@api/apiGenresSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetLanguagesQuery } from "@api/apiLanguagesSlice";

import { IGenre } from "@src/types/genre";
import { IAuthor } from "@src/types/author";
import { IPublisher } from "@src/types/publisher";
import { ILanguage } from "@src/types/language";

type FieldOption<DataType> = {
	data: DataType[];
	isLoading: boolean;
};

type FieldOptions = {
	"info.genre"?: FieldOption<IGenre>;
	"info.author"?: FieldOption<IAuthor>;
	"info.publisher"?: FieldOption<IPublisher>;
	"info.language"?: FieldOption<ILanguage>;
};

const BookFormData = () => {
	const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();
	const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
	const { data: publishers, isLoading: isLoadingPublishers } =
		useGetPublishersQuery();
	const { data: languages, isLoading: isLoadingLanguages } =
		useGetLanguagesQuery();

	const fieldOptions: FieldOptions = {
		"info.genre": { data: genres?.data || [], isLoading: isLoadingGenres },
		"info.author": { data: authors?.data || [], isLoading: isLoadingAuthors },
		"info.publisher": {
			data: publishers?.data || [],
			isLoading: isLoadingPublishers,
		},
		"info.language": {
			data: languages?.data || [],
			isLoading: isLoadingLanguages,
		},
	};

	return fieldOptions;
};

const BookSheet = () => {
	const fieldData = BookFormData();

	return <Sheet config={booksConfig} fieldOptions={fieldData} />;
};

export default BookSheet;

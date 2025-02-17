import Sheet from "../sheet";
import { booksConfig } from "./books.config";

import { useGetGenresQuery } from "@api/apiGenresSlice";
import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetLanguagesQuery } from "@api/apiLanguagesSlice";

const BookFormData = () => {
  const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery(null);
	const { data: authors, isLoading: isLoadingAuthors } =
		useGetAuthorsQuery(null);
	const { data: publishers, isLoading: isLoadingPublishers } =
		useGetPublishersQuery(null);
	const { data: languages, isLoading: isLoadingLanguages } =
		useGetLanguagesQuery(null);

	const fieldData = {
		"info.genre": {
			data: genres || [],
			isLoading: isLoadingGenres,
		},
		"info.Author": {
			data: authors || [],
			isLoading: isLoadingAuthors,
		},
		"info.publisher": {
			data: publishers || [],
			isLoading: isLoadingPublishers,
		},
		"info.language": {
			data: languages || [],
			isLoading: isLoadingLanguages,
		},
	};

	return fieldData;
};

const BookSheet = () => {
	return <Sheet config={booksConfig} fieldData={BookFormData()} />;
};

export default BookSheet;

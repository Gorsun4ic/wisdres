import i18n from "@src/i18n";

import { IBook } from "@custom-types/book";
import { IAuthor } from "@custom-types/author";
import { ILanguage } from "@src/types/language";
import { IPublisher } from "@src/types/publisher";
import { stringTuple, IFilterParams, IFilterExpanded } from "@custom-types/filter";

type allowedKeys = "author" | "publisher" | "language";

// Extract unique values for filters
export const getBooksSpecificData = (
	data: IBook[],
	key: allowedKeys
): stringTuple[] => {
	if (!Array.isArray(data)) return [];

	const lang = i18n?.language as "en" | "ua";

	const mapFn = (book: IBook): stringTuple[] => {
		switch (key) {
			case "author": {
				const authors = book?.info?.author as IAuthor[];
				return (authors || []).map((author: IAuthor) => [
					author?._id,
					author?.title[lang],
				]);
			}
			case "language": {
				const language = book?.info?.language as ILanguage | undefined;
				if (!language) return [];
				return [[language?._id, language?.title[lang]]];
			}
			case "publisher": {
				const publisher = book?.info?.publisher as IPublisher;
				if (!publisher) return [];
				return [[publisher?._id, publisher?.title]];
			}
			default:
				return [];
		}
	};

	// Get all tuples from all books and flatten to one array
	const allTuples = data.flatMap(mapFn);

	const uniqueMap = new Map<string, string>();
	allTuples.forEach(([id, title]) => {
		if (!uniqueMap.has(id)) uniqueMap.set(id, title);
	});

	console.log(uniqueMap);

	return Array.from(uniqueMap.entries());
};

// Get min and max pages
export const getMinMaxPages = (books: IBook[]): [number, number] => {
	if (!books || (Array.isArray(books) && books.length === 0)) return [0, 1];

	const maxPages = Math.max(...books.map((book) => book?.info?.pages));
	return [0, isFinite(maxPages) ? maxPages : 1];
};

// Filter books based on selected filters
export const filterBooks = (
	books: IBook[],
	filters: IFilterParams
): IBook[] => {
	if (!books) return [];

	const { authors, publishers, languages, pages } = filters;

	return books.filter((book) => {
		const authorsIds = book.info.author.map((author) => author._id);

		const authorMatch =
			!authors.length ||
			authors.some((author: string) => authorsIds.includes(author));

		const publisherMatch =
			!publishers.length ||
			publishers.some(
				(publisher: string) => book?.info?.publisher._id === publisher
			);
		const languageMatch =
			!languages.length ||
			languages.some(
				(language: string) => book?.info?.language._id === language
			);

		const pageMatch =
			book?.info?.pages >= pages[0] && book?.info?.pages <= pages[1];

		return authorMatch && publisherMatch && languageMatch && pageMatch;
	});
};

// Sort filtered books
export const sortBooks = (books: IBook[], sortBy: string) => {
	if (!books.length) return [];

	return [...books].sort((a, b) => {
		switch (sortBy) {
			case "reviews":
				return b.reviews.length - a.reviews.length;
			case "rating":
				return b.info.rating - a.info.rating;
			default:
				return 0;
		}
	});
};

// Filter data update function
export const createFilterData = (books: IBook[]): IFilterExpanded => {
	return {
		authors: getBooksSpecificData(books, "author"),
		publishers: getBooksSpecificData(books, "publisher"),
		languages: getBooksSpecificData(books, "language"),
		pages: getMinMaxPages(books),
	};
};
import { useState, useCallback, useEffect } from "react";

import { useGetFilterTitlesQuery } from "@api/apiFilters";

import { IBook } from "@custom-types/book";

type allowedKeys = "author" | "publisher" | "language";

interface IFilter {
	authors: string[] | [];
	publishers: string[] | [];
	languages: string[] | [];
	pages: [number, number] | null;
}

export const useBookFilters = (
	books: IBook[] | undefined,
	sortBy: string,
	filters: IFilter
) => {
	const [filterData, setFilterData] = useState<IFilter>({
		authors: [],
		publishers: [],
		languages: [],
		pages: null,
	});
	const [filterTitles, setFilterTitles] = useState<IFilter>({
		authors: [],
		publishers: [],
		languages: [],
		pages: null,
	});

	const { data: filterTitlesData } = useGetFilterTitlesQuery({
		authorsIds: filterData.authors,
		publishersIds: filterData.publishers,
		languagesIds: filterData.languages,
	});

	useEffect(() => {
		if (filterData && filterTitlesData) {
			setFilterTitles((prev) => ({
				...prev,
				pages: getMinMaxPages(),
				...filterTitlesData,
			}));
		}
	}, [filterData, filterTitlesData]);

	// Extract unique values for filters
	const getBooksSpecificData = useCallback(
		(data: IBook[], key: allowedKeys) => {
			if (!Array.isArray(data)) return [];

			const uniqueValues = new Set(
				data
					.flatMap((item) => {
						if (Array.isArray(item?.info?.[key])) {
							return item?.info?.[key];
						}
						return item?.info?.[key];
					})
					.filter(Boolean)
			);
			return Array.from(uniqueValues);
		},
		[]
	);

	// Get min and max pages
	const getMinMaxPages = useCallback(() => {
		if (!books || (Array.isArray(books) && books.length === 0)) return null;

		const maxPages = Math.max(...books.map((book) => book?.info?.pages));
		return [0, isFinite(maxPages) ? maxPages : 1];
	}, [books]);

	// Update filter data
	const updateFilterData = useCallback(() => {
		if (!books) return;
		setFilterData({
			authors: getBooksSpecificData(books, "author"),
			publishers: getBooksSpecificData(books, "publisher"),
			languages: getBooksSpecificData(books, "language"),
			pages: getMinMaxPages(),
		});
	}, [books, getBooksSpecificData, getMinMaxPages]);

	// Filter books based on selected filters
	const filteredBooks = useCallback(() => {
		if (!books) return [];

		return books.filter((book) => {
			const { authors, publishers, languages, pages } = filters;

			const authorsIds = book.info.author.map((author) => author._id);

			const authorMatch =
				!authors.length ||
				authors.some((author) => authorsIds.includes(author[0]));
			const publisherMatch =
				!publishers.length ||
				publishers.some((publisher) =>
					book?.info?.publisher.includes(publisher[0])
				);
			const languageMatch =
				!languages.length ||
				languages.some((language) =>
					book?.info?.language.includes(language[0])
				);

			const pageMatch = pages
				? !pages.length ||
				  (book?.info?.pages >= pages[0] && book?.info?.pages <= pages[1])
				: true;

			return authorMatch && publisherMatch && languageMatch && pageMatch;
		});
	}, [books, filters]);

	// Sort filtered books
	const sortBooks = useCallback(() => {
		const filtered = filteredBooks();

		if (!filtered.length) return [];

		return [...filtered].sort((a, b) => {
			switch (sortBy) {
				case "reviews":
					return b.reviews.length - a.reviews.length;
				case "rating":
					return b.info.rating - a.info.rating;
				default:
					return 0;
			}
		});
	}, [filteredBooks, sortBy]);

	return {
		filterData: Array.isArray(books) && books.length > 0 ? filterTitles : null,
		filteredBooks: filteredBooks(),
		sortedBooks: sortBooks(),
		updateFilterData,
	};
};

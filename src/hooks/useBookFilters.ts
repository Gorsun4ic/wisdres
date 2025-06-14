import { useState, useEffect, useMemo } from "react";

import { useTranslation } from "react-i18next";

import { filterBooks, sortBooks, createFilterData } from "@utils/filterHelpers";

import { IBook } from "@custom-types/book";
import { IFilterExpanded, IFilterParams } from "@custom-types/filter";

/**
 * This hook gets books by genres, sorting criteria and filters. It returns filters params, and filtered and sorted books as IBook arrays
 * @param books
 * @param sortBy
 * @param filters
 * @returns {
 * filterData: IFilterExpanded,
 * filteredBooks: IBook[],
 * sortedBooks: IBook[]
 * }
 */

export const useBookFilters = (
	books: IBook[],
	sortBy: string,
	filters: IFilterParams = {
		authors: [],
		publishers: [],
		languages: [],
		pages: [0, 1],
	}
): {
	filterData: IFilterExpanded;
	filteredBooks: IBook[];
	sortedBooks: IBook[];
} => {
	const {
		i18n: { language },
	} = useTranslation();

	const [filterData, setFilterData] = useState<IFilterExpanded>({
		authors: [],
		publishers: [],
		languages: [],
		pages: [0, 1],
	});

	// Update filter data whenever books change
	useEffect(() => {
		if (!books || books.length === 0) {
			setFilterData({
				authors: [],
				publishers: [],
				languages: [],
				pages: [0, 1],
			});
			return;
		}

		setFilterData(createFilterData(books));
	}, [books, language]);

	// Filter books based on selected filters
	const filteredBooks = useMemo(() => {
		if (!books) return [];

		return filterBooks(books, filters);
	}, [books, filters]);

	// Sort filtered getBooksSpecificData
	const sortedBooks = useMemo(() => {
		return sortBooks(filteredBooks, sortBy);
	}, [filteredBooks, sortBy]);

	return {
		filterData:
			Array.isArray(books) && books.length > 0
				? filterData
				: ({
						authors: [],
						publishers: [],
						languages: [],
						pages: [0, 1],
				  } as IFilterExpanded),
		filteredBooks: filteredBooks,
		sortedBooks: sortedBooks,
	};
};

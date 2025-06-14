import { useState, useEffect, useMemo } from "react";

import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

import { IBook } from "@custom-types//book";
import { SortType } from "@src/types/filter";

// Custom utils
import sortNumbers from "@utils/sortNumbers";
import { getRecentViewedBook } from "@utils/handleLocalStorage";

export default function useSortedBooks(
	arr: IBook[],
	filter: SortType,
	number: number
) {
	const [booksData, setBooksData] = useState<IBook[]>([]);
	const [getBookById] = useLazyGetBookByIdQuery();

	useEffect(() => {
		if (filter !== "recent") return;

		const recentBooksIds = getRecentViewedBook();
		if (recentBooksIds.length === 0) return;

		const getMultipleBooksById = async () => {
			try {
				const results = await Promise.all(
					recentBooksIds.map(async (id) => {
						const res = await getBookById(id).unwrap();

						if (res.success && res.data) {
							return res.data;
						} else {
							return null;
						}
					})
				);
				const filteredResults = results.filter(
					(book): book is IBook => book !== null
				);

				setBooksData(filteredResults);
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		getMultipleBooksById();
	}, [getBookById, filter]);

	const filteredBooks = useMemo(() => {
		if (filter === "recent") return booksData;

		const sortBy = filter === "date" ? "arrived" : "rating";
		return sortNumbers(arr, sortBy).slice(0, number);
	}, [filter, arr, booksData, number]);

	return filteredBooks;
}

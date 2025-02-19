import { useState, useEffect } from "react";

import { useLazyGetBookByIdQuery } from "@api/apiBooksSlice";

import { IBook } from "@custom-types/book";

// Custom utils
import sortNumbers from "@utils/sortNumbers";
import { getRecentViewedBook } from "@utils/handleLocalStorage";

export default function useFilterArr(
	arr: IBook[],
	filter: string,
	number: number
) {
	const [option, setOption] = useState("");
	const [getBookById] = useLazyGetBookByIdQuery();
	const [booksData, setBooksData] = useState<IBook[]>([]);

	useEffect(() => {
			const recentBooksIds = getRecentViewedBook();
		if (recentBooksIds.length === 0) return;

		const getMultipleBooksById = async () => {
			const results = await Promise.all(
				recentBooksIds.map((id) => getBookById(id).unwrap())
			);
			setBooksData(results);
		};

		getMultipleBooksById();
	}, [getBookById]);

	useEffect(() => {
		switch (filter) {
			case "popularity":
				setOption("rating");
				break;
			case "date":
				setOption("year");
				break;
			case "recent":
				setOption("recent");
				break;
			default:
				setOption("rating");
		}
	}, [filter]);

	if (option === "recent") {
		return booksData;
	}
	// Call the sorting hook unconditionally
	const sortedArr = sortNumbers(arr, option); // Use filter directly for dynamic sorting

	return sortedArr.slice(0, number);
}

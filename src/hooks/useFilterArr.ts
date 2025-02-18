import { useState, useEffect } from "react";

// Custom utils
import sortNumbers from "@utils/sortNumbers";

import { IBook } from "@custom-types/book";

export default function useFilterArr(arr: IBook[], filter: string, number: number) {
	const [option, setOption] = useState("");


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
		return arr.slice(0, number);
	}
	// Call the sorting hook unconditionally
	const sortedArr = sortNumbers(arr, option); // Use filter directly for dynamic sorting

	return sortedArr.slice(0, number);
}

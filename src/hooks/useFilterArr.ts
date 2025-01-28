import { useState, useEffect } from "react";

// Custom utils
import { getRecentViewedBook } from "@utils/handleLocalStorage";
import sortNumbers from "@utils/sortNumbers";

type Item = {
	[key: string]: number | null | undefined; // Dynamic keys like "rating", "popularity"
};

export default function useFilterArr(
	arr: Item[],
	filter: string,
	number: number
) {
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

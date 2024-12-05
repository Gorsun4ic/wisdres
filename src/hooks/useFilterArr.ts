import { useState, useEffect } from "react";
import useSortNumbers from "./useSortNumbers";

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
			default:
				setOption("rating");
		}
	}, [filter])
	// Call the sorting hook unconditionally
	const sortedArr = useSortNumbers(arr, option); // Use filter directly for dynamic sorting

	return sortedArr.slice(0, number + 1);
}

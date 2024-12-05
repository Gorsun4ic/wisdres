interface Item {
	[key: string]: number | null | undefined; // Accepts any number-based value or null/undefined for fields
}

export default function useSortNumbers(arr: Item[], option: string): Item[] {
	if (!arr || !Array.isArray(arr)) {
		console.error("Invalid array passed to useSortNumbers:", arr);
		return []; // Return an empty array if arr is invalid
	}

	// Proceed with filtering and sorting if arr is valid
	return arr
		.filter((item) => item[option] !== null && item[option] !== undefined) // Remove items with no option
		.sort((a, b) => (b[option] || 0) - (a[option] || 0)); // Sort by rating, defaulting to 0 if undefined
}

import { IBook } from "@custom-types//book";

export default function sortBooksByNumericProperty(
	books: IBook[],
	property: keyof IBook["info"]
): IBook[] {
	if (!books || !Array.isArray(books)) {
		console.error("Invalid array passed to sortBooksByNumericProperty:", books);
		return [];
	}

	const arr = books
		.filter((book) => {
			// Keep only books that have the property
			return book?.info && book.info[property] !== undefined;
		})
		.sort((a, b) => {
			// Handle date properties
			if (property === "arrived") {
				// Convert string dates to timestamps for comparison
				const dateA = new Date(
					a.info[property] as unknown as string | Date
				).getTime();
				const dateB = new Date(
					b.info[property] as unknown as string | Date
				).getTime();
				

				// Sort in descending order (newest first)
				return dateB - dateA;
			}

			// Handle numeric properties
			const valueA = Number(a.info[property]);
			const valueB = Number(b.info[property]);
			return valueB - valueA; // Sort in descending order
		});
	return arr;
}

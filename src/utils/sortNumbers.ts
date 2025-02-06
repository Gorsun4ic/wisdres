import { IBook } from "@custom-types/book";

export default function sortBooksByNumericProperty(
	books: IBook[],
	property: keyof IBook["info"]
): IBook[] {
	if (!books || !Array.isArray(books)) {
		console.error("Invalid array passed to sortBooksByNumericProperty:", books);
		return [];
	}

	return books
		.filter(
			(book) =>
				// Check if book and info property exist before accessing nested properties
				book?.info &&
				typeof book.info[property] === "number" &&
				book.info[property] !== null
		)
		.sort((a, b) => {
			// Safely access nested numeric properties
			const valueA = a.info[property] as number;
			const valueB = b.info[property] as number;
			return valueB - valueA; // Sort in descending order
		});
}

import { IBook } from "@custom-types/book";

export default function sortBooksByNumericProperty(
	books: IBook[],
	property: keyof IBook["info"]
): IBook[] {
	if (!books || !Array.isArray(books)) {
		console.error("Invalid array passed to sortBooksByNumericProperty:", books);
		return [];
	}

	console.log("PROPERTY", property)

	const arr = books
		.filter((book, index, arr) => {
			// Check if book and info property exist before accessing nested properties
			if (book?.info && typeof book.info[property] === "number") {
				return book.info[property];
			}
			if (!book?.info[property]) {
				return arr;
			}
		})
		.sort((a, b) => {
			// Safely access nested numeric properties
			const valueA = a.info[property] as number;
			const valueB = b.info[property] as number;
			return valueB - valueA; // Sort in descending order
		});
	return arr;
}

export const addRecentViewedBook = (bookId: string) => {
	if (!bookId) {
		return null;
	}

	const viewedBooksLegacy: string | null = localStorage.getItem("viewed_books");

	let viewedBooks = [];

	if (viewedBooksLegacy) {
		try {
			viewedBooks = JSON.parse(viewedBooksLegacy);

			if (!Array.isArray(viewedBooks)) {
				viewedBooks = [];
			}
		} catch (e) {
			viewedBooks = [];
		}
	}

	if (!viewedBooks.includes(bookId)) {
		viewedBooks.push(bookId);
	}

	localStorage.setItem("viewed_books", JSON.stringify(viewedBooks));
};

export const getRecentViewedBook = () => {
		const viewedBooksLegacy: string | null =
			localStorage.getItem("viewed_books");

		let viewedBooks = [];

		if (viewedBooksLegacy) {
			try {
				viewedBooks = JSON.parse(viewedBooksLegacy);

				if (!Array.isArray(viewedBooks)) {
					viewedBooks = [];
				}
			} catch (e) {
				viewedBooks = [];
			}
		}

		return viewedBooks;


}
// Show author's name instead of ID
import { IBookInfo } from "@custom-types/book";
import { IAuthor } from "@custom-types/author";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

const useShowAuthorsName = () => {
	const { data: authorsData } = useGetAuthorsQuery(null);

	const getAuthorsNameArr = ({
		booksData,
		authorsData,
	}: {
		booksData: IBookInfo[];
		authorsData: IAuthor[];
	}) => {
		if (!booksData || !authorsData) {
			// Handle case where data is missing
			return [];
		}

		// Map through books and assign correct author names
		const correctData = booksData.map((book) => {
			const authorElem = authorsData.find(
				(author) => author._id === book.author
			);
			return {
				...book,
				author: authorElem?.title || "Unknown Author", // Use "title" from author or fallback
			};
		});

		return correctData;
	};

	const getAuthorsNameElem = (id: string) => {
		const authorsName =
			authorsData?.find((author: IAuthor) => author?._id === id)?.title ||
			"Unknown Author";
		return authorsName;
	};

	return {
		getAuthorsNameArr,
		getAuthorsNameElem,
	};
};

export default useShowAuthorsName;

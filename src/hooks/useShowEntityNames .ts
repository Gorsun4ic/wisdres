import { IBook } from "@custom-types/book";
import { IAuthor } from "@custom-types/author";
import { IPublisher } from "@custom-types/publisher";
import { IGenre } from "@custom-types/genre";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";
import { useGetPublishersQuery } from "@api/apiPublishersSlice";
import { useGetGenresQuery } from "@api/apiGenresSlice";

const useShowEntityNames = () => {
	const { data: authorsData } = useGetAuthorsQuery(null);
	const { data: publishersData } = useGetPublishersQuery(null);
	const { data: genresData } = useGetGenresQuery(null);

	// Generic function to get the name of an entity by ID
	const getEntityName = ({
		id,
		entitiesData,
		fallback = "Unknown Entity",
	}: {
		id: string;
		entitiesData: IAuthor[] | IPublisher[] | IGenre[];
		fallback?: string;  
	}) => {
		return entitiesData?.find((entity) => entity._id === id)?.title || fallback;
	};

	// Function to map an array of genre IDs to their names
	const getGenresName = (genreIds: string[]) => {
		if (!genresData) return ["Unknown Genre"];
		return genreIds.map((id) =>
			getEntityName({
				id,
				entitiesData: genresData,
				fallback: "Unknown Genre",
			})
		);
	};

	// Main function to attach entity names to books
	const getBooksWithEntityNames = ({
		booksData,
		authorsData,
		publishersData,
		genresData,
	}: {
		booksData: IBook[];
		authorsData: IAuthor[];
		publishersData: IPublisher[];
		genresData: IGenre[];
	}) => {
		if (!booksData || !authorsData || !publishersData || !genresData) {
			return [];
		}

		return booksData.map((book) => {
			const authorName = getEntityName({
				id: book?.info?.author,
				entitiesData: authorsData,
				fallback: "Unknown Author",
			});

			const publisherName = getEntityName({
				id: book?.info?.publisher,
				entitiesData: publishersData,
				fallback: "Unknown Publisher",
			});

			const genresName = getGenresName(book?.info?.genre || []);

			const { info, ...data } = book;
			return {
				...data,
				info: {
					...info,
					author: authorName,
					publisher: publisherName,
					genre: genresName, // Include genres titles array
				},
			};
		});
	};

	const getAuthorName = (id: string) =>
		getEntityName({
			id,
			entitiesData: authorsData,
			fallback: "Unknown Author",
		});

	const getPublisherName = (id: string) =>
		getEntityName({
			id,
			entitiesData: publishersData,
			fallback: "Unknown Publisher",
		});

	return {
		getBooksWithEntityNames,
		getAuthorName,
		getPublisherName,
		getGenresName
	};
};

export default useShowEntityNames;

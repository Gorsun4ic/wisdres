import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Stack } from "@mui/material";

import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetBooksQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";

const AuthorPage = () => {
	const { authorId } = useParams();
	const [getAuthorById, { data: authorData }] = useLazyGetAuthorByIdQuery();
	const { data } = useGetBooksQuery();
	const books = data?.filter((book) =>
		authorData?.bookIds?.includes(book?._id)
	);

	useEffect(() => {
		if (authorId) {
			getAuthorById(authorId);
		}
	}, [authorId]);

	return (
		<Stack gap={6}>
			<Stack direction="row" gap={4}>
				<img
					src={authorData?.img}
					width="500"
					alt={`Picture of ${authorData?.title}`}
				/>
				<Stack gap={2}>
					<h1>{authorData?.title}</h1>
					<p>{authorData?.about}</p>
				</Stack>
			</Stack>
			<BookCollection title="Author's books" booksArr={books} />
		</Stack>
	);
};

export default AuthorPage;

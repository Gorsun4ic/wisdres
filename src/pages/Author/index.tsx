import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Stack, CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";


import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetBooksQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";

const AuthorPage = () => {
	const { authorId } = useParams();
	const [getAuthorById, { data: authorData, isLoading, isError }] =
		useLazyGetAuthorByIdQuery();
	const { data } = useGetBooksQuery();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const books = data?.filter((book) =>
		authorData?.bookIds?.includes(book?._id)
	);

	useEffect(() => {
		if (authorId) {
			getAuthorById(authorId);
		}
	}, [authorId]);

	useEffect(() => {
		if (!isLoading && !data) {
			// navigate("*")
			const navigateTo404 = setTimeout(() => {
				navigate("*");
			}, 1000);
			return () => clearTimeout(navigateTo404);
		}
	}, [isLoading, data]);

	if (isLoading || !data) {
		return (
			<div>
				<CircularProgress
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				/>
			</div>
		);
	}

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
			<BookCollection title={t("authorsBook")} booksArr={books} />
		</Stack>
	);
};

export default AuthorPage;

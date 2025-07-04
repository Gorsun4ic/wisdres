import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Stack, CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";


import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetBooksQuery } from "@api/apiBooksSlice";
import { useLazyGetAuthorByIdQuery } from "@api/apiAuthorsSlice";

import { getLangEntity } from "@src/utils/getLangEntity";

const AuthorPage = () => {
	const { authorId } = useParams();
	const [getAuthorById, { data: authorData, isLoading, isError }] =
		useLazyGetAuthorByIdQuery();
	const { data } = useGetBooksQuery();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const lang = i18n.language;

	const books = data?.data?.filter((book) =>
		authorData?.data?.bookIds?.includes(book?._id)
	);

	useEffect(() => {
		if (authorId) {
			getAuthorById(authorId);
		}
	}, [authorId]);

	useEffect(() => {
		if (!isLoading && !data) {
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
					src={authorData?.data?.img}
					width="500"
					alt={`Picture of ${authorData?.data?.title?.en}`}
				/>
				<Stack gap={2}>
					<h1>{getLangEntity(authorData?.data?.title, lang)}</h1>
					<p> {getLangEntity(authorData?.data?.about, lang)}</p>
				</Stack>
			</Stack>
			<BookCollection title={t("authorsBook")} booksArr={books} />
		</Stack>
	);
};

export default AuthorPage;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Stack, CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";

import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetBooksQuery } from "@api/apiBooksSlice";
import { useLazyGetPublisherByIdQuery } from "@api/apiPublishersSlice";

import { getLangEntity } from "@src/utils/getLangEntity";
import { LangType } from "@src/i18n";

const PublisherPage = () => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language as LangType;

	const { publisherId } = useParams();
	const [getPublisherById, { data: publisherData, isLoading }] =
		useLazyGetPublisherByIdQuery();
	const { data } = useGetBooksQuery();
	const navigate = useNavigate();
	const books = data?.data?.filter((book) =>
		publisherData?.data?.bookIds?.includes(book?._id)
	);

	useEffect(() => {
		if (publisherId) {
			getPublisherById(publisherId);
		}
	}, [publisherId, getPublisherById]);

	useEffect(() => {
		if (!isLoading && !data) {
			const navigateTo404 = setTimeout(() => {
				navigate("*");
			}, 1000);
			return () => clearTimeout(navigateTo404);
		}
	}, [isLoading, data, navigate]);

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
					src={publisherData?.data?.img}
					width="500"
					alt={`Picture of ${publisherData?.data?.title}`}
				/>
				<Stack gap={2}>
					<h1>{publisherData?.data?.title}</h1>
					<p>{getLangEntity(publisherData?.data?.about ?? "", lang)}</p>
				</Stack>
			</Stack>
			<BookCollection title={t("publisherBooks")} booksArr={books} filterBy={"date"} number={0} />
		</Stack>
	);
};

export default PublisherPage;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Stack, CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";


import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetBooksQuery } from "@api/apiBooksSlice";
import { useLazyGetPublisherByIdQuery } from "@api/apiPublishersSlice";

const PublisherPage = () => {
	const { t } = useTranslation();

	const { publisherId } = useParams();
	const [getPublisherById, { data: publisherData, isLoading }] =
		useLazyGetPublisherByIdQuery();
	const { data } = useGetBooksQuery();
	const navigate = useNavigate();
	const books = data?.filter((book) =>
		publisherData?.bookIds?.includes(book?._id)
	);

	useEffect(() => {
		if (publisherId) {
			getPublisherById(publisherId);
		}
	}, [publisherId]);

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
					src={publisherData?.img}
					width="500"	
					alt={`Picture of ${publisherData?.title}`}
				/>
				<Stack gap={2}>
					<h1>{publisherData?.title}</h1>
					<p>{publisherData?.about}</p>
				</Stack>
			</Stack>
			<BookCollection title={t("publisherBooks")} booksArr={books} />
		</Stack>
	);
};

export default PublisherPage;

import { useTranslation } from "react-i18next";

import { useGetGenresQuery } from "@api/apiGenresSlice";

import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

import ErrorMessage from "@components/error";

const MainPage = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useGetGenresQuery();

	const genres = data?.success && data.data ? data.data : [];

	return (
		<div className="main-page">
			<Hero />
			<GenresCollection data={genres} isLoading={isLoading} />
			{error && <ErrorMessage>{t("failedToLoadGenres")}</ErrorMessage>}
			<BookCollection filterBy="popularity" number={6} title={t("topBooks")} />
			<BookCollection filterBy="date" number={6} title={t("newArrivals")} />
		</div>
	);
};

export default MainPage;

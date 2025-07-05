import { useTranslation } from "react-i18next";

import { useGetGenresQuery } from "@api/apiGenresSlice";

import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

import ErrorMessage from "@components/error";

const MainPage = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useGetGenresQuery();

	return (
		<div className="main-page">
			<Hero />
			{data && <GenresCollection data={data} isLoading={isLoading} />}
			{error && <ErrorMessage>{t("failedToLoadGenres")}</ErrorMessage>}
			<BookCollection filterBy="rating" number={6} title={t("topBooks")} />
			<BookCollection filterBy="date" number={6} title={t("newArrivals")} />
		</div>
	);
};

export default MainPage;

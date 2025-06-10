import { useTranslation } from "react-i18next";

import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

import { useGetGenresQuery } from "@api/apiGenresSlice";

const MainPage = () => {
	const { t } = useTranslation();
	const { data } = useGetGenresQuery(null);

	return (
		<div className="main-page">
			<Hero />
			<GenresCollection data={data} />
			<BookCollection filterBy="popularity" number={6} title={t("topBooks")} />
			<BookCollection filterBy="date" number={6} title={t("newArrivals")} />
		</div>
	);
};

export default MainPage;

import { useEffect } from "react";

import { getRecentViewedBook } from "@utils/handleLocalStorage";

import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/bookCollection/bookCollection";

const MainPage = () => {

	return (
		<div className="main-page">
			<Hero />
			<GenresCollection />
			<BookCollection filterBy="recent" number={5} title="You recent viewed" />
			<BookCollection
				filterBy="popularity"
				number={5}
				title="The most popular"
			/>
			<BookCollection filterBy="date" number={5} title="New Arrivals" />
		</div>
	);
};

export default MainPage;

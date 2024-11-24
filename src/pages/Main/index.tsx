import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/book-collection";

const MainPage = () => {
	return (
		<div className="main-page">
			<Hero />
			<GenresCollection />
			<BookCollection title="The most popular" />
			<BookCollection title="New Arrivals" />
			<BookCollection title="Staff picks" />
		</div>
	);
}

export default MainPage;
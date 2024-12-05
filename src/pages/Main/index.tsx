import Hero from "@features/hero";
import GenresCollection from "@features/genres/genres-collection";
import BookCollection from "@features/books/book-collection";

const MainPage = () => {
	return (
		<div className="main-page">
			<Hero />
			<GenresCollection />
			<BookCollection filterBy="popularity" number={5} title="The most popular" />
			<BookCollection filterBy="date" number={5} title="New Arrivals" />
		</div>
	);
}

export default MainPage;
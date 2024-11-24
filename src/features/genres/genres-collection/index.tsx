import { Stack } from "@mui/material";
import { StyledGenresCollection } from "./style";
import GenreCard from "../genre-card";

const GenresCollection = () => {

	return (
		<StyledGenresCollection className="genres-collection">
			<h2>Genres</h2>
			<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
				<GenreCard
					img="https://m.media-amazon.com/images/I/81ErH6RdLpL._UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF894,1000_QL80_.jpg"
					genreName="Romance novel"
				/>
				<GenreCard
					img="https://cdn.europosters.eu/image/750/%D0%A4%D0%BE%D1%82%D0%BE%D1%88%D0%BF%D0%B0%D0%BB%D0%B5%D1%80%D0%B8/harry-potter-deathly-hallows-book-cover-i214933.jpg"
					genreName="Fantasy"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF1000,1000_QL80_.jpg"
					genreName="Science Fiction"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/810u9MkT3SL.jpg"
					genreName="Self-help"
				/>
				<GenreCard
					img="https://mybookshelf.com.ua/assets/images/products/17896/shukhevych800x800.jpg"
					genreName="Biography & Memoir"
				/>
			</Stack>
		</StyledGenresCollection>
	);

};

export default GenresCollection;
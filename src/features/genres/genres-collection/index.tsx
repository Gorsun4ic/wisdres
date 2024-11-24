import { Stack } from "@mui/material";
import { StyledGenresCollection } from "./style";
import GenreCard from "../genre-card";

const GenresCollection = () => {

	return (
		<StyledGenresCollection className="genres-collection">
			<h2>Genres</h2>
			<Stack direction="row" spacing={2} sx={{justifyContent: "center"}}>
				<GenreCard
					img="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
				<GenreCard
					img="https://m.media-amazon.com/images/I/6158m1qLqFL._AC_UF1000,1000_QL80_.jpg"
					genreName="Mystery & Thriller"
				/>
			</Stack>
		</StyledGenresCollection>
	);

};

export default GenresCollection;
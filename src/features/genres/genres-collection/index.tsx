import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { IGenre } from "@custom-types/genre";

import GenreCard from "../genre-card";

import { StyledGenresCollection } from "./style";

const GenresCollection = ({ data }: {data: IGenre[]}) => {
	const genreList = data?.map((item) => {
		return (
			<Grid2 size={2} key={item?._id}>
				<Link to={item?.title.toLowerCase()}>
					<GenreCard img={item?.img} genreName={item?.title} />
				</Link>
			</Grid2>
		);
	});

	return (
		<StyledGenresCollection className="genres-collection">
			<h2>Genres</h2>
			<Grid2 container spacing={6} rowSpacing={3}>
				{genreList}
			</Grid2>
		</StyledGenresCollection>
	);
};

export default GenresCollection;

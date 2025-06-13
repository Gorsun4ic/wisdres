import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { IGenre } from "@custom-types/genre";

import GenreCard from "../genre-card";

import { StyledGenresCollection } from "./style";

const GenresCollection = ({ data }: { data: IGenre[] }) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language;
	const location = useLocation();
	const { pathname } = location;

	const genreList = data?.map((item) => {
		const linkPath = pathname.includes("books")
			? item?.title["en"].toLowerCase()
			: `books/${item?.title["en"].toLowerCase()}`;
		return (
			<Grid2 size={2} key={item?._id}>
				<Link to={linkPath}>
					<GenreCard img={item?.img[lang]} genreName={item?.title[lang]} />
				</Link>
			</Grid2>
		);
	});

	return (
		<StyledGenresCollection className="genres-collection">
			<h2>{t("genres")}</h2>
			<div className="genres-list">{genreList}</div>
		</StyledGenresCollection>
	);
};

export default GenresCollection;

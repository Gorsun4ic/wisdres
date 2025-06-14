import { Link } from "react-router-dom";
import { Grid2, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { IGenre } from "@custom-types/genre";

import GenreCard from "../genre-card";

import { StyledGenresCollection } from "./style";

const GenresCollection = ({
	data,
	isLoading,
}: {
	data: IGenre[];
	isLoading: boolean;
}) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language as "en" | "ua";

	const location = useLocation();
	const { pathname } = location;

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	const genreList = data?.map((item: IGenre) => {
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

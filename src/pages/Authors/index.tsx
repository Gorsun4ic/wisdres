import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

import SearchBar from "@components/search-bar";

import { StyledAuthorsPage } from "./style";

const AuthorsPage = () => {
	const {data: authors} = useGetAuthorsQuery(null);
	const { t, i18n } = useTranslation();
	const lang = i18n.language;


	const authorsList = authors?.map(item => {
		return (
			<Grid2 size={3}>
				<Link to={`/author/${item?._id}`}>
					{item?.title[lang]}
					{` (${item?.bookIds?.length})`}
				</Link>
			</Grid2>
		);
	})

	return (
		<StyledAuthorsPage>
			<h1>{t("authors")}</h1>
			<SearchBar />
			<div className="authors-list">
				{authorsList}
			</div>
		</StyledAuthorsPage>
	);
};

export default AuthorsPage;
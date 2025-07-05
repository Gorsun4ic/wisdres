import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

import SearchBar from "@components/search-bar";

import { getLangEntity } from "@src/utils/getLangEntity";

import { StyledAuthorsPage } from "./style";
import { LangType } from "@src/i18n";

const AuthorsPage = () => {
	const {data: authors} = useGetAuthorsQuery();
	const { t, i18n } = useTranslation();
	const lang = i18n.language as LangType;


	const authorsList = authors?.data?.map((item) => (
		<Grid2 key={item?._id} size={3}>
			<Link to={`/author/${item?._id}`}>
				{getLangEntity(item?.title, lang)}
				{` (${item?.bookIds?.length})`}
			</Link>
		</Grid2>
	));

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
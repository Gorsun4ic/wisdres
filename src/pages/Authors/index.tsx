import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useGetAuthorsQuery } from "@api/apiAuthorsSlice";

import SearchBar from "@components/search-bar";

import { IAuthor } from "@src/types/author";
import { ApiSuccess } from "@custom-types/apiResponse";

import { StyledAuthorsPage } from "./style";

const AuthorsPage = () => {
	const {data: authors} = useGetAuthorsQuery();
	const { t, i18n } = useTranslation();
	const lang = i18n.language;


	const authorsList = authors?.data?.map((item) => (
		<Grid2 key={item?._id} size={3}>
			<Link to={`/author/${item?._id}`}>
				{item?.title[lang]}
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
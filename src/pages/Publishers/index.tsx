import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useGetPublishersQuery } from "@api/apiPublishersSlice";

import SearchBar from "@components/search-bar";

import { StyledPublishersPage } from "./style";

const PublishersPage = () => {	
	const { t } = useTranslation();
	const {data: publishers} = useGetPublishersQuery(null);

	const publishersList = publishers?.map((item) => {
		return (
			<Grid2 size={3}>
				<Link to={`/publisher/${item?._id}`}>
					{item?.title}
					{` (${item?.bookIds?.length})`}
				</Link>
			</Grid2>
		);
	});

	return (
		<StyledPublishersPage>
			<h1>{t("publishers")}</h1>
			<SearchBar />
			<div className="publishers-list">{publishersList}</div>
		</StyledPublishersPage>
	);
};

export default PublishersPage;

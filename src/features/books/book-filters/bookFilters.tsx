import { useTranslation } from "react-i18next";

import { CircularProgress } from "@mui/material";

// Custom components
import RangeSlider from "@components/range-slider";
import ScrolledFilter from "./scrolled-filter";

import { IFilterExpanded } from "@custom-types/filter";

// Custom styles
import { StyledBookFilters } from "./style";

const BookFilters = ({
	data,
	isLoading,
}: {
	data: IFilterExpanded;
	isLoading: boolean;
}) => {
	const { t } = useTranslation();

	if (
		!data ||
		data.authors.length === 0 ||
		data.publishers.length === 0 ||
		data.languages.length === 0
	)
		return;

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	return (
		<StyledBookFilters>
			<span>Filters</span>
			{data.authors.length > 0 && (
				<ScrolledFilter
					data={data.authors}
					type="authors"
					placeholder={t("writeAuthorName")}
					title={t("authors")}
				/>
			)}
			{data.publishers.length > 0 && (
				<ScrolledFilter
					data={data.publishers}
					type="publishers"
					placeholder={t("writePublisherName")}
					title={t("publishers")}
				/>
			)}
			{data.languages.length > 0 && (
				<ScrolledFilter
					data={data.languages}
					type="languages"
					placeholder={t("writeLanguageName")}
					title={t("languages")}
				/>
			)}
			{data.pages && data.pages.length > 0 && (
				<RangeSlider pageDiapason={data.pages} />
			)}
		</StyledBookFilters>
	);
};

export default BookFilters;

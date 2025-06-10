import { useTranslation } from "react-i18next";

// Custom components
import RangeSlider from "@components/range-slider";
import ScrolledFilter from "./scrolled-filter";

// Custom styles
import { StyledBookFilters } from "./style";

interface IBookFilters {
	authors: string[];
	publishers: string[];
	languages: string[];
	pages: [number, number];
}

const BookFilters = ({ data }: { data: IBookFilters }) => {

	const { t } = useTranslation();

	if (!data) return;

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

import { useEffect } from "react";

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

const BookFilters = ({ data }: {data: IBookFilters}) => {

	if (!data) return

	return (
		<StyledBookFilters>
			<span>Filters</span>
			{data.authors.length > 0 && (
				<ScrolledFilter
					data={data.authors}
					type="authors"
					placeholder="Write authors name"
					title="Authors"
				/>
			)}
			{data.publishers.length > 0 && (
				<ScrolledFilter
					data={data.publishers}
					type="publishers"
					placeholder="Write publisher name"
					title="Publishers"
				/>
			)}
			{data.languages.length > 0 && (
				<ScrolledFilter
					data={data.languages}
					type="languages"
					placeholder="Write language"
					title="Languages"
				/>
			)}
			{data.pages.length > 0 && (
				<RangeSlider pageDiapason={data.pages}/>
			)}
		</StyledBookFilters>
	);
};

export default BookFilters;

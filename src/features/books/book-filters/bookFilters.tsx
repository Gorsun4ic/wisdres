// Custom components
import RangeSlider from "@components/range-slider";
import ScrolledFilter from "./scrolled-filter";

// Custom styles
import { StyledBookFilters } from "./style";

interface IBookFilters {
	authors: string[];
	publishers: string[];
	languages: string[];
	pages: number[];
}

const BookFilters = ({ data }: {data: IBookFilters}) => {

	return (
		<StyledBookFilters>
			<span>Filters</span>
			<ScrolledFilter	
				data={data.authors}
				type="authors"
				placeholder="Write authors name"
				title="Authors"
			/>
			<ScrolledFilter
				data={data.publishers}
				type="publishers"
				placeholder="Write publisher name"
				title="Publishers"

			/>
			<ScrolledFilter
				data={data.languages}
				type="languages"
				placeholder="Write language"
				title="Languages"

			/>
			<RangeSlider />
		</StyledBookFilters>
	);
};

export default BookFilters;

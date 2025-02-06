import RangeSlider from "@components/range-slider";

import { StyledBookFilters } from "./style";
import ScrolledFilter from "./scrolled-filter";

const BookFilters = ({ data }) => {

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

import useShowEntityNames from "@hooks/useShowEntityNames ";

import RangeSlider from "@components/range-slider";

import { StyledBookFilters } from "./style";
import ScrolledFilter from "./scrolled-filter";

const BookFilters = ({ data }) => {
	const { getAuthorName, getPublisherName, getLanguageName } = useShowEntityNames();

	const authors = data?.authors.map((id: string) => [
		id,
		getAuthorName(id) ?? "Unknown author",
	]);

	const publishers = data?.publishers.map((id: string) => [
		id,
		getPublisherName(id) ?? "Unknown publisher",
	]);

	const languages = data?.languages.map((id: string) => [
		id,
		getLanguageName(id) ?? "Unknown language"
	]);

	return (
		<StyledBookFilters>
			<span>Filters</span>
			<ScrolledFilter
				data={authors}
				type="authors"
				placeholder="Write authors name"
				title="Authors"
			/>
			<ScrolledFilter
				data={publishers}
				type="publishers"
				placeholder="Write publisher name"
				title="Publishers"
			/>
			<ScrolledFilter
				data={languages}
				type="languages"
				placeholder="Write language"
				title="Languages"
			/>
			<RangeSlider />
		</StyledBookFilters>
	);
};

export default BookFilters;

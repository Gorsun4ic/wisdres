import { TextField, List, ListItem } from "@mui/material";
import Checkbox from "@components/checkbox";
import { StyledScrolledFilter } from "./style";

const ScrolledFilter = ({title, data, placeholder}: {title: string, data: string[], placeholder: string}) => {

	const checkboxesList = data.map(item => {
		return (
			<ListItem>
				<Checkbox label={item} />
			</ListItem>
		);
	})

	return (
		<StyledScrolledFilter className="scrolled-filter">
			<span className="scrolled-filter__name">{title}</span>
			{data.length > 5 && <TextField placeholder={placeholder} />}
			<List>
				{checkboxesList}
			</List>
		</StyledScrolledFilter>
	);
};

export default ScrolledFilter;
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
	StyledFormControl,
	StyledMenuItem,
	StyledSelect,
} from "./style";

const Select = () => {
	// Setting the default option to "20", which corresponds to "Twenty"
	const [age, setAge] = useState<string>("rating");

	const handleChange = (event: SelectChangeEvent<unknown>) => {
		setAge(event.target.value as string); // Update the selected value
	};

	return (
		<StyledFormControl fullWidth>
			<StyledSelect
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={age} // This binds the select's value to the state
				label="Age"
				onChange={handleChange} // When the user changes the selection, update the state
				inputProps={{ "aria-label": "Without label" }}>
				{/* The default selected value is "20" */}
				<StyledMenuItem value="rating">Rating</StyledMenuItem>
				<StyledMenuItem value="downloads">Downloads</StyledMenuItem>
				<StyledMenuItem value="reviews">Reviews</StyledMenuItem>
			</StyledSelect>
		</StyledFormControl>
	);
};

export default Select;

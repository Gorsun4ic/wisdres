import { Controller, FieldValues, Control } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

type OptionType = {
	title: string;
};

interface AutoCompleteFieldProps {
	name: string;
	control: Control<FieldValues>;
	options: OptionType[];
	label: string;
	placeholder: string;
	value?: OptionType | null; // Initial value for edit mode
	rules?: object;
}

const AutoCompleteField = ({
	name,
	control,
	options,
	label,
	placeholder,
	value = null,
	rules = {},
}: AutoCompleteFieldProps) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		defaultValue={value} // Ensure default value is passed to the Controller
		render={({ field }) => (
			<>
				<p className="input-label">{label}</p>
				<Autocomplete
					options={options}
					getOptionLabel={(option) => option?.title || ""}
					isOptionEqualToValue={(option, value) =>
						option?.title === value?.title
					}
					value={value} // Sync with field value
					inputValue={value} // Sync with field value
					onChange={(_, newValue) => field.onChange(newValue)} // Update field value
					renderInput={(params) => (
						<TextField {...params} placeholder={placeholder} />
					)}
				/>
			</>
		)}
	/>
);

export default AutoCompleteField;

import { Controller, FieldValues, Control } from "react-hook-form";
import {
	Autocomplete,
	TextField,
} from "@mui/material";

const AutoCompleteField = ({
	name,
	control,
	options,
	label,
	placeholder,
	rules,
}: {
	name: string;
	control: Control<FieldValues>;
	label: string;
	placeholder: string;
	options: unknown[];
	rules?: object;
}) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		render={({ field }) => (
			<>
				<p className="input-label">{label}</p>
				<Autocomplete
					{...field}
					options={options || []}
					getOptionLabel={(option) => option?.title || ""}
					onChange={(event, value) => field.onChange(value)}
					renderInput={(params) => (
						<TextField {...params} placeholder={placeholder} />
					)}
				/>
			</>
		)}
	/>
);

export default AutoCompleteField
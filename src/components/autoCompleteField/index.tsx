// React Hook Form
import { Controller, FieldValues, Control } from "react-hook-form";

// MUI
import useAutocomplete, {
	AutocompleteGetTagProps,
} from "@mui/material/useAutocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { TextField, Box } from "@mui/material";

interface AutoCompleteFieldProps {
	name: string;
	control: Control<FieldValues>;
	options: { title: string }[];
	label: string;
	placeholder: string;
	value?: { title: string } | null;
	rules?: object;
	multiple?: boolean;
}

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
	label: string;
}

const Root = styled("div")`
	width: 100%;
	position: relative;
`;

function Tag(props: TagProps) {
	const { label, onDelete, ...other } = props;
	return (
		<div {...other}>
			<span>{label}</span>
			<CloseIcon onClick={onDelete} />
		</div>
	);
}

const StyledTag = styled(Tag)`
	display: inline-flex;
	align-items: center;
	padding: 4px 8px;
	background: #e0e0e0;
	border-radius: 4px;
	gap: 4px;

	svg {
		width: 16px;
		height: 16px;
		cursor: pointer;
		opacity: 0.7;

		&:hover {
			opacity: 1;
		}
	}
`;

const Listbox = styled("ul")`
	margin: 2px 0 0;
	padding: 0;
	list-style: none;
	background-color: #fff;
	max-height: 250px;
	overflow-y: auto;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	position: absolute;
	width: 100%;
	z-index: 3;

	li {
		padding: 8px 12px;
		cursor: pointer;

		&:hover {
			background-color: #f5f5f5;
		}

		&[aria-selected="true"] {
			background-color: #e3f2fd;
		}

		&.${autocompleteClasses.focused} {
			background-color: #e3f2fd;
		}
	}
`;

const AutoCompleteField = ({
	name,
	control,
	options,
	label,
	placeholder,
	rules = {},
	multiple = true,
	error
}: AutoCompleteFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={multiple ? [] : null}
			render={({ field }) => (
				<AutocompleteInput
					field={field}
					options={options}
					label={label}
					placeholder={placeholder}
					multiple={multiple}
					error={error}
				/>
			)}
		/>
	);
};

// Separate component to handle Autocomplete logic
const AutocompleteInput = ({
	field,
	options,
	label,
	placeholder,
	multiple,
	error
}: AutocompleteInputProps) => {
	const {
		getRootProps,
		getInputProps,
		getTagProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		value,
		setAnchorEl,
	} = useAutocomplete({
		...field,
		id: field.name,
		multiple,
		options,
		getOptionLabel: (option: {title: string}) => option.title,
		isOptionEqualToValue: (option: {title: string}, value: {title: string}) => option.title === value.title,
		onChange: (_, newValue) => field.onChange(newValue),
	});

	return (
		<Root>
			<div {...getRootProps()}>
				<TextField
					ref={setAnchorEl}
					label={label}
					error={error}
					helperText={error}
					placeholder={placeholder}
					fullWidth
					InputProps={{
						...getInputProps(),
						startAdornment: multiple && value && Array.isArray(value) && (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{value.map((option: {title: string}, index: number) => {
									const { key, ...tagProps } = getTagProps({ index });
									return (
										<StyledTag key={key} {...tagProps} label={option.title} />
									);
								})}
							</Box>
						),
					}}
				/>
			</div>
			{groupedOptions.length > 0 ? (
				<Listbox {...getListboxProps()}>
					{(groupedOptions as typeof options).map((option: {title: string}, index: number) => {
						const { key, ...optionProps } = getOptionProps({
							option,
							index,
						});
						return (
							<li key={key} {...optionProps}>
								<span>{option.title}</span>
							</li>
						);
					})}
				</Listbox>
			) : null}
		</Root>
	);
};

export default AutoCompleteField;

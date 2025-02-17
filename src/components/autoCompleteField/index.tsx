import { Controller, FieldValues, Control } from "react-hook-form";
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

const Label = styled("label")`
	display: block;
	margin-bottom: 8px;
`;

const InputWrapper = styled("div")`
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;

	&:hover {
		border-color: #666;
	}

	&.focused {
		border-color: #1976d2;
		box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
	}

	input {
		border: none;
		outline: none;
		flex: 1;
		min-width: 100px;
	}
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
	value = null,
	rules = {},
	multiple = true,
}: AutoCompleteFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={multiple ? [] : null}
			render={({ field }) => {
				const {
					getRootProps,
					getInputLabelProps,
					getInputProps,
					getTagProps,
					getListboxProps,
					getOptionProps,
					groupedOptions,
					value,
					focused,
					setAnchorEl,
				} = useAutocomplete({
					...field,
					id: name,
					multiple,
					options,
					getOptionLabel: (option) => option.title,
					isOptionEqualToValue: (option, value) => option.title === value.title,
					onChange: (_, newValue) => {
						field.onChange(newValue);
					},
				});

				return (
					<Root>
						<div {...getRootProps()}>
							<TextField
								ref={setAnchorEl}
								label={label}
								placeholder={placeholder}
								fullWidth
								InputProps={{
									...getInputProps(),
									startAdornment: multiple && value && Array.isArray(value) && (
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{value.map((option: any, index: number) => {
												const { key, ...tagProps } = getTagProps({ index });
												return (
													<StyledTag
														key={key}
														{...tagProps}
														label={option.title}
													/>
												);
											})}
										</Box>
									),
								}}
							/>
						</div>
						{groupedOptions.length > 0 ? (
							<Listbox {...getListboxProps()}>
								{(groupedOptions as typeof options).map((option, index) => {
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
			}}
		/>
	);
};

export default AutoCompleteField;

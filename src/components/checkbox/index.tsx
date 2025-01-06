import { StyledCheckbox, StyledFormControlLabel } from "./style";

const Checkbox = ({
	label,
	checked,
	onChange,
	disabled
}: {
	label: string;
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}) => {
	return (
		<StyledFormControlLabel
			control={<StyledCheckbox checked={checked} onChange={onChange} disabled={disabled}/>}
			label={label}
		/>
	);
};

export default Checkbox;

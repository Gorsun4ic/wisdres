import { StyledCheckbox, StyledFormControlLabel } from "./style";

const Checkbox = ({
	label,
	checked,
	onChange,
}: {
	label: string;
	checked: boolean;
	onChange: () => void;
}) => {
	return (
		<StyledFormControlLabel
			control={<StyledCheckbox checked={checked} onChange={onChange} />}
			label={label}
		/>
	);
};

export default Checkbox;

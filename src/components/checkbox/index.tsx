import { StyledCheckbox, StyledFormControlLabel} from "./style"

const Checkbox = ({label}: {label: string}) => {
	return <StyledFormControlLabel control={<StyledCheckbox/>} label={label}/>
}

export default Checkbox;
import { StyledButton } from "./style";

const Button = ({children, size = "small", submit = false}: {children: React.ReactNode, size: "small" | "big", submit?: boolean}) => {
	return <StyledButton size={size} variant="contained" type={submit ? "submit" : "button"}>{children}</StyledButton>;
}

export default Button;
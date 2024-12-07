import { StyledButton } from "./style";

type ButtonProps = {
	children: React.ReactNode;
	size: "small" | "big";
	submit?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Extend with button attributes

const Button = ({
	children,
	size = "small",
	submit = false,
	...rest // Capture additional props like onClick
}: ButtonProps) => {
	return (
		<StyledButton
			className={`button ${rest.className || ""}`} // Dynamically add className
			size={size}
			variant="contained"
			type={submit ? "submit" : "button"}
			{...rest} // Forward additional props
		>
			{children}
		</StyledButton>
	);
};

export default Button;

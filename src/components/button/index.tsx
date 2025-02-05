import { CircularProgress } from "@mui/material";
import { StyledButton } from "./style";

type ButtonSize = "small" | "big";
type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	size?: ButtonSize;
	variant?: ButtonVariant;
	isLoading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
}

const Button = ({
	children,
	size = "small",
	variant = "primary",
	isLoading = false,
	startIcon,
	endIcon,
	fullWidth = false,
	type = "button",
	disabled,
	className,
	...rest
}: ButtonProps) => {
	return (
		<StyledButton
			className={`button ${className || ""}`}
			size={size}
			$variant={variant}
			$fullWidth={fullWidth}
			type={type}
			disabled={disabled || isLoading}
			{...rest}>
			{isLoading ? (
				<CircularProgress size={24} color="inherit" />
			) : (
				<>
					{startIcon && (
						<span className="button-icon start-icon">{startIcon}</span>
					)}
					{children}
					{endIcon && <span className="button-icon end-icon">{endIcon}</span>}
				</>
			)}
		</StyledButton>
	);
};

export default Button;

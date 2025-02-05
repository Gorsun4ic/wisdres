import { Button } from "@mui/material";
import styled, { css } from "styled-components";

type ButtonSize = "small" | "big";
type ButtonVariant = "primary" | "secondary" | "outlined";

interface StyledButtonProps {
	size: ButtonSize;
	$variant: ButtonVariant;
	$fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
	switch (variant) {
		case "secondary":
			return css`
				background-color: ${({ theme }) => theme.colors.grey};
				color: ${({ theme }) => theme.colors.black};
				&:hover {
					background-color: ${({ theme }) => theme.colors.darkGrey};
				}
			`;
		case "outlined":
			return css`
				background-color: transparent;
				border: 1px solid ${({ theme }) => theme.colors.green};
				color: ${({ theme }) => theme.colors.green};
				&:hover {
					background-color: ${({ theme }) => theme.colors.lightGreen};
				}
			`;
		default:
			return css`
				background-color: ${({ theme }) => theme.colors.green};
				color: ${({ theme }) => theme.colors.white};
				&:hover {
					background-color: ${({ theme }) => theme.colors.darkGreen};
				}
			`;
	}
};

export const StyledButton = styled(Button)<StyledButtonProps>`
	&& {
		min-height: ${({ size }) => (size === "big" ? "48px" : "36px")};
		padding: ${({ size }) => (size === "big" ? "8px 32px" : "4px 16px")};
		font-size: ${({ size }) => (size === "big" ? "16px" : "14px")};
		font-weight: 500;
		line-height: 1.5;
		letter-spacing: 0.3px;
		border-radius: 4px;
		box-shadow: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		transition: all 0.2s ease-in-out;
		text-transform: none;
		width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

		${({ $variant }) => getVariantStyles($variant)}

		&:disabled {
			background-color: ${({ theme }) => theme.colors.lightGrey};
			color: ${({ theme }) => theme.colors.grey};
			cursor: not-allowed;
			opacity: 0.7;
			border: none;
		}

		.button-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: inherit;

			&.start-icon {
				margin-right: 4px;
			}

			&.end-icon {
				margin-left: 4px;
			}

			svg {
				font-size: ${({ size }) => (size === "big" ? "20px" : "18px")};
			}
		}

		.MuiCircularProgress-root {
			color: inherit;
			width: ${({ size }) => (size === "big" ? "24px" : "20px")} !important;
			height: ${({ size }) => (size === "big" ? "24px" : "20px")} !important;
		}

		&:hover {
			box-shadow: none;
		}

		&:active {
			transform: translateY(1px);
		}
	}
`;

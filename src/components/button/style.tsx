import { Button } from "@mui/material";
import styled from "styled-components";

type ButtonSize = "small" | "big";

export const StyledButton = styled(Button)<{ size: ButtonSize }>`
	&& {
		background-color: ${({ theme }) => theme.colors.green};
		color: #fff;
		border: none;
		border-radius: 2px;
		font-size: ${({ size }) => (size === "big" ? "1.5rem" : "1.25rem")};
		display: inline-block;
		padding: ${({ size }) => (size === "big" ? "8px 30px" : "0 20px")};
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.3s;
		text-transform: none;
		width: 100%;

		&:hover {
			background-color: ${({ theme }) => theme.colors.darkGreen};
		}
	}
`;
import styled from "styled-components";
import { Box } from "@mui/material";

export const StyledWelcomeText = styled.h4`
	&& {
		font-size: ${({ theme }) => theme.fontSizes.h4};
		margin-bottom: 24px;
	}
`;

export const StyledInfoBox = styled(Box)`
	&& {
		background-color: ${({ theme }) => theme.colors.white};
		padding: 24px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

		.info-title {
			font-size: ${({ theme }) => theme.fontSizes.h6};
			margin-bottom: 16px;
		}

		.info-item {
			margin-bottom: 12px;

			strong {
				color: ${({ theme }) => theme.colors.darkGrey};
				margin-right: 8px;
			}
		}
	}
`;

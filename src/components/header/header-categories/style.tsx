import styled from "styled-components";
import { Stack } from "@mui/material";

export const StyledHeaderCategories = styled(Stack)`
	&& {
		.category-title {
			margin-bottom: 16px;
			font-size: ${({ theme }) => theme?.fontSizes?.h4};
			font-weight: ${({theme}) => theme?.fontWeights?.medium};
		}
		.category-item {
			font-size: ${({ theme }) => theme?.fontSizes?.default};
		}
		.category-all {
			color: ${({ theme }) => theme?.colors?.grey};
			text-decoration: underline;
			&:hover {
				color: ${({ theme }) => theme?.colors?.green};
			}
		}
	}
`;

import styled from "styled-components";
import { Stack } from "@mui/material";

export const StyledBookSort = styled(Stack)`
	&& {

		& > p {
			font-weight: ${({theme}) => theme?.fontWeights?.medium};
		}

		span, svg {
			color: ${({theme}) => theme?.colors?.grey};
		}

		span {
			transition: color 0.3s ease;
			cursor: pointer;
			&:hover {
				color: ${({theme}) => theme?.colors?.green};
			}
		}

		svg {
			font-size: 0.8rem;
		}
	}
`
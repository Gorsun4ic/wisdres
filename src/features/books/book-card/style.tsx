import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

export const StyledCard = styled(Card)`
	&& {
		img {
			max-width: 100%;
		}

		:hover {
			cursor: pointer;
		}
	}
`;

export const StyledCardContent = styled(CardContent)`
	&& {
		padding: 6px 6px 12px !important;
		h3 {
			margin-bottom: 4px;
		}
		> p {
			margin-bottom: 8px;
			color: ${({ theme }) => theme?.colors?.grey};
		}
	}
`;

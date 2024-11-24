import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

export const StyledCard = styled(Card)`
	&& {
		box-shadow: none;
		text-align: center;
		img {
			max-width: 130px;
			margin-bottom: 10px;
		}

		:hover {
			cursor: pointer;
		}
	}
`;

export const StyledCardContent = styled(CardContent)`
	&& {

		h3 {
			margin-bottom: 4px;
			font-weight: ${({theme}) => theme?.fontWeights?.regular};
		}

	}
`;

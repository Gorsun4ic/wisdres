import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

export const StyledCard = styled(Card)`
	&& {
		display: flex; 
		flex-direction: column;
		height: 100%;
		width: 100%;

		img {
			max-width: 100%;
			width: 100%;
			object-fit: contain;
		}

		:hover {
			cursor: pointer;
		}
	}
`;

export const StyledCardContent = styled(CardContent)`
	&& {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding:16px !important;

		button {
			margin-top: 12px;
		}

		h3 {
			margin-bottom: 4px;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* number of lines to show */
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		> p {
			margin-bottom: 8px;
			color: ${({ theme }) => theme?.colors?.grey};
		}
	}
`;

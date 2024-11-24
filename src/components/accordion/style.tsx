import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import styled from "styled-components";

export const StyledAccordion = styled(Accordion)`
	&& {
		color: ${({theme}) => theme.colors.grey};
		box-shadow: none;
		min-height: 25px;
	}
`;

export const StyleAccordionSummary = styled(AccordionSummary)`
	&& {
		min-height: 0;
		.MuiAccordionSummary-content {
			margin: 6px 0;
		}
	}
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
&&{
	padding: 4px 4px 4px 24px; 
}`;
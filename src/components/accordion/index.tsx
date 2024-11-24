import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
	StyledAccordion,
	StyleAccordionSummary,
	StyledAccordionDetails,
} from "./style";

const Accordion = ({
	title,
	children,
	id,
}: {
	title: string;
	children: React.ReactNode;
	id: string;
}) => {
	return (
		<StyledAccordion>
			<StyleAccordionSummary
				id={id}
				aria-controls={`${id}-content`}
				expandIcon={<ExpandMoreIcon />}>
				{title}
			</StyleAccordionSummary>
			<StyledAccordionDetails id={`${id}-content`}>
				{children}
			</StyledAccordionDetails>
		</StyledAccordion>
	);
};

export default Accordion;

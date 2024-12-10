import styled from "styled-components";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
	&& {
		.edit-property {
			margin-bottom: 24px;
		}
		.edit-property__title {
			margin-bottom: 8px;
			font-size: ${({ theme }) => theme?.fontSizes?.h4};
		}
		.edit-property__old,
		.edit-property__new {
			margin-left: 6px;
		}
		.edit-property__old {
			margin-bottom: 6px;
			color: ${({ theme }) => theme?.colors?.red};
		}
		.edit-property__new {
			color: ${({ theme }) => theme?.colors?.green};
		}
	}
`;
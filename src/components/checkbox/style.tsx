import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";

export const StyledFormControlLabel = styled(FormControlLabel)`
	&& {
		.MuiCheckbox-root {
			padding: 4px 4px 4px 9px;
			color: ${({ theme }) => theme.colors.grey};
		}
		.MuiFormControlLabel-label {
			color: ${({ theme }) => theme.colors.grey};
		}
	}
`;

export const StyledCheckbox = styled(Checkbox)`
	&& {
		.MuiSvgIcon-root {
			color: ${({ theme }) => theme.colors.grey};
			border-radius: 2px;
			font-size: 1.2rem;
		}
	}
`;

import styled from "styled-components";
import { TextField } from "@mui/material";

export const StyledField = styled(TextField)`
	&& {
		.show-password {
			svg {
				fill: ${({ theme }) => theme?.colors?.black};
			}
			&.active {
				svg {
					fill: ${({ theme }) => theme?.colors?.darkGreen};
				}
			}
		}
	}
`;

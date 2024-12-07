import { Modal } from "@mui/material";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
	&& {
		.modal__container {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;
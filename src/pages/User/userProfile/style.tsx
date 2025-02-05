import styled from "styled-components";
import { Box } from "@mui/material";

export const StyledProfileContainer = styled(Box)`
	&& {
		display: flex;
		min-height: 100vh;
		background-color: ${({ theme }) => theme.colors.lightGrey};
	}
`;

export const StyledSidebar = styled(Box)`
	&& {
		width: 250px;
		background-color: ${({ theme }) => theme.colors.white};
		padding: 20px;
		border-right: 1px solid ${({ theme }) => theme.colors.grey};

		.MuiTabs-root {
			border-right: 1px solid ${({ theme }) => theme.colors.grey};
			padding-right: 32px;
			min-width: 140px;
		}

		.MuiTabs-flexContainer {
			flex-direction: column;
			align-items: flex-start;
		}

		.MuiButtonBase-root {
			align-items: center;
			width: auto;
			gap: 8px;
			padding: 8px;
			min-height: 32px;
			text-transform: inherit;
			min-width: 0;
		}

		.Mui-selected {
			color: ${({ theme }) => theme.colors.green};
		}

		.MuiTabs-indicator {
			display: none;
		}

		.MuiSvgIcon-root {
			margin: 0;
		}
		
	}
`;

export const StyledMainContent = styled(Box)`
	&& {
		flex: 1;
		padding: 30px;

		
	}
`;

export const StyledUserProfileContainer = styled(Box)`
	&& {
		.MuiDialog-container svg {
			fill: ${({ theme }) => theme?.colors?.darkGreen};
		}
	}
`;

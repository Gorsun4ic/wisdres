import styled from "styled-components";

export const StyledAdminPanel = styled.div`
	&& {
		display: flex;
		.MuiListItemIcon-root {
			min-width: 24px;
		}
		img {
			max-width: 100%;
			min-width: none;
		}
		.MuiTabs-root {
			border-right: 1px solid ${({ theme }) => theme?.colors?.grey};
			padding-right: 32px;
			min-width: 140px;
		}

		.MuiTabPanel-root {
			width: 100%;
		}
		.MuiTabs-flexContainer {
			flex-direction: column;
			align-items: flex-start;
		}

		.admin-panel__bar {
			margin-bottom: 32px;
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
			color: ${({ theme }) => theme?.colors?.green};
		}

		.MuiTabs-indicator {
			display: none;
		}

		.active-tab-section {
			p {
				font-size: ${({ theme }) => theme?.fontSizes?.h4};
			}
		}
		.MuiSvgIcon-root {
			margin: 0;
		}
	}
`;

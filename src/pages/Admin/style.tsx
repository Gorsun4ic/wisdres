import styled from "styled-components";

export const StyledAdminPanel = styled.div`
	&& {

		display: flex;

		img {
			max-width: 100%;
			min-width: none;
		}
		.MuiTabs-root {
			border-right: 1px solid ${({ theme }) => theme?.colors?.grey};
			padding-right: 32px;
		}

		.MuiTabs-flexContainer {
			flex-direction: column;
			align-items: flex-start;
		}

		.admin-panel__bar {
			max-width: 300px;
			margin-bottom: 32px;
		}

		.MuiButtonBase-root {
			align-items: center;
			gap: 8px;
			padding: 8px 0;
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

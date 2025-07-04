import styled from "styled-components";

export const StyledScrolledFilter = styled.div`
	&& {
		max-width: 250px;
		margin-bottom: 16px;
		input {
			padding: 6px 12px;
		}
		li {
			padding: 0;
		}
		& > span {
			display: block;
			margin-bottom: 8px;
			font-size: ${({ theme }) => theme?.fontSizes?.h3};
			color: ${({ theme }) => theme?.colors?.grey};
		}

		.MuiTextField-root {
			width: 100%;
			margin-bottom: 12px;
		}
		.MuiList-root {
			max-height: 175px;
			overflow-y: auto;
		}

		.MuiSvgIcon-root {
			color: ${({ theme }) => theme.colors.grey};
			border-radius: 2px;
			font-size: 1.2rem;
		}

		.MuiCheckbox-root {
			padding: 4px 4px 4px 9px;
			color: ${({ theme }) => theme.colors.grey};
		}
		.MuiFormControlLabel-label {
			color: ${({ theme }) => theme.colors.grey};
		}

		::-webkit-scrollbar {
			width: 6px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: #979797;
			border-radius: 10px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: #8d8d8d;
			cursor: pointer;
		}
	}
`;
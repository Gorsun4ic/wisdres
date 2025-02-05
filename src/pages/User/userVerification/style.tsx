import styled from "styled-components";

export const StyledForm = styled.form`
	&& {
		border-radius: 16px;
		background-color: ${({ theme }) => theme?.colors?.white};
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
		max-width: 600px;
		padding-top: 32px;
		margin: 0 auto;
		svg {
			fill: ${({ theme }) => theme?.colors?.darkGreen};
			margin-right: 6px;
		}
		.error {
			text-align: center;
		}
		.form-title {
			text-align: center;
			margin-bottom: 8px;
			font-weight: ${({ theme }) => theme?.fontWeights?.medium};
		}
		.input-label {
			margin-bottom: 8px;
		}
		.MuiBox-root {
			background-color: ${({ theme }) => theme?.colors?.darkGrey};
			text-align: center;
			padding: 16px;
			border-radius: 0 0 16px 16px;
			a {
				color: ${({ theme }) => theme?.colors?.darkGreen};
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;

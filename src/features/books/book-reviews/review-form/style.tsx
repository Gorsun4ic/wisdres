import styled from "styled-components";

export const StyledForm = styled.form`
	&& {
		padding: 24px;
		background-color: ${({ theme }) => theme?.colors?.formBackground};
		border-radius: ${({ theme }) => theme?.borders?.borderRadius};
		max-width: 600px;
		width: 100%;
		h3 {
			margin-bottom: 18px;
		}
		.MuiRating-root {
			margin-bottom: 16px;
		}
		button {
			max-width: 140px;
		}

		p {
			margin-bottom: 16px;
		}

		.MuiInputBase-root {
			margin-bottom: 16px;
		}

		.input-label {
			margin-bottom: 8px;
		}
		
		.MuiFormHelperText-root {
			margin-left: 0;
		}
	}
`;

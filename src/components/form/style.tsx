import styled from "styled-components";

export const StyledForm = styled.form`
	&& {
		padding: 24px;
		background-color: ${({ theme }) => theme?.colors?.formBackground};
		border-radius: ${({ theme }) => theme?.borders?.borderRadius};
		h3 {
			margin-bottom: 18px;
		}
		.MuiRating-root {
			margin-bottom: 16px;
		}
		button {
			max-width: 140px;
		}
		.MuiOutlinedInput-root {
			fieldset {
				border-color: ${({ theme }) => theme.colors.grey};
			}
			&.Mui-focused fieldset {
				border-color: ${({ theme }) => theme.colors.grey};
				border-width: 1px;
			}
		}
		.MuiFormHelperText-root {
			margin-left: 0;
		}
	}
`;
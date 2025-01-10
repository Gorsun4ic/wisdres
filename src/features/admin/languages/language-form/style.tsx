import styled from "styled-components";

export const StyledForm = styled.form`
	&& {
		background-color: ${({ theme }) => theme?.colors?.white};
		padding: 32px;
		border-radius: ${({ theme }) => theme?.borders?.borderRadius};
		.form-title {
			text-align: center;
			margin-bottom: 32px;
		}
		.input-label {
			margin-bottom: 8px;
		}
		img {
			object-fit: contain;
		}
		.img-input {
			.MuiFormControl-root {
				margin-bottom: 16px;
			}
		}
	}
`;

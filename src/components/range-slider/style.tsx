import styled from "styled-components";

export const StyledSlider = styled.div`
	&& {
		.MuiSlider-thumb,
		.MuiSlider-rail,
		.MuiSlider-track {
			background-color: ${({ theme }) => theme.colors.grey};
		}
		.MuiInputBase-root {
			padding: 4px;
			max-height: 40px;
			max-width: 80px;
		}
	}
`;
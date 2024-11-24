import styled from "styled-components";
import Slider from "@mui/material/Slider";

export const StyledSlider = styled(Slider)`
	&& {
		.MuiSlider-thumb,
		.MuiSlider-rail,
		.MuiSlider-track {
			background-color: ${({theme}) => theme.colors.grey};
		}
	}
`;
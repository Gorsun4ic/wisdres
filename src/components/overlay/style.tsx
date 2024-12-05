import styled from "styled-components";

export const StyledOverlay = styled.div`
	&& {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.2);
		z-index: 3;
	}
`
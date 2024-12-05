import styled from "styled-components";

export const StyledSearchBar = styled.div`
	&& {
		position: relative;
		svg {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 8px;
		}
		input {
			padding: 6px 8px 6px 32px;
		}
	}
`
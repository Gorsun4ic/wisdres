import styled from "styled-components";

export const StyledBookDescription = styled.div`
	&& {
		h2 {
			margin-bottom: 64px;
			text-align: center;
		}
		h3 {
			font-size: 1.5rem;
			margin-bottom: 12px;
		}
		p {
			color: ${({theme}) => theme?.colors?.grey};
		}
	}
`

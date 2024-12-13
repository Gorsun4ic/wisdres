import styled from "styled-components";

export const StyledError = styled.div`
	&& {
		img {
			margin-bottom: 16px;
		}
		p {
			color: ${({theme}) => theme?.colors?.red};
		}
	}
`
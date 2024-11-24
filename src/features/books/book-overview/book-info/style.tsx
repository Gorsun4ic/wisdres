import styled from "styled-components";

export const StyledBookInfo = styled.div`
	&& {
		.book-title {
			margin-bottom: 12px;
		}

		ul {
			margin-bottom: 12px;
		}
		
		li {
			padding: 2.5px 0 2.5px;
			color: ${({ theme }) => theme?.colors?.grey};
		}

		button {
			max-width: 170px;
		}
	}
`;

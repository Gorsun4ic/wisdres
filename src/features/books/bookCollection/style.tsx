import styled from "styled-components";

export const StyledBookCollection = styled.div`
	&& {
		margin-bottom: 60px;
		h2 {
			@media (max-width: 500px) {
				font-size: ${({ theme }) => theme?.fontSizes?.h3};
			}
		}
	}
`;

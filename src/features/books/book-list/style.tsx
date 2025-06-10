import styled from "styled-components";

export const StyledList = styled.div`
	&& {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 16px;
		.book-card {
			max-width: 235px;
		}
	}
`;

import styled from "styled-components";

export const StyledGenresCollection = styled.div`
	&& {
		margin-bottom: 60px;
		h2 {
			text-align: center;
			margin-bottom: 36px;
		}
		.genres-list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1.5rem;
			@media (max-width: 768px) {
				grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			}
		}
	}
`;
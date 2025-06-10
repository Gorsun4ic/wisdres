import styled from "styled-components";

export const StyledGenrePage = styled.div`
	&& {
		h2 {
			margin-bottom: 60px;
			text-align: center;
		}
		.book-amount {
			font-size: 1.5rem;
			@media (max-width: 500px) {
				display: block;
				width: 100%;
				text-align: center;
			}
		}

		.genre-sort {
			@media (max-width: 500px) {
				flex-wrap: wrap;
				justify-content: center;
				text-align: center;
			}
		}

		.button {
			max-width: 150px;
			margin-bottom: 32px;
		}

		.genre-layout {
			@media (max-width: 768px) {
				flex-wrap: wrap;
			}
		}
		@media (max-width: 768px) {
			aside {
				max-width: none;
			}
		}
	}
`;
import styled from "styled-components";

export const StyledPublishersPage = styled.div`
	&& {
		h1 {
			margin-bottom: 30px;
			text-align: center;
		}
		.search-bar {
			max-width: 600px;
			width: 100%;
			margin: 0 auto 60px;
			.MuiFormControl-root {
				width: 100%;
			}
		}

		.publishers-list {
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 12px;
			@media (max-width: 992px) {
				grid-template-columns: repeat(3, 1fr);
			}
			@media (max-width: 550px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media (max-width: 390px) {
				grid-template-columns: repeat(1, 1fr);
				text-align: center;
			}
		}
	}
`;

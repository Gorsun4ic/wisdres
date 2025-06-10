import styled from "styled-components";

export const StyledBookInfo = styled.div`
	&& {
		display: flex;
		gap: 16px;

		@media (max-width: 768px){
			flex-wrap: wrap;
		}

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

		img {
			display: block;
			margin: 0 auto;
			max-width: 100%;
			object-fit: contain;
			@media (max-width: 425px) {
				max-height: 300px;
			}
		}
	}
`;

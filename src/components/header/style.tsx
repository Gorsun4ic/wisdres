import styled from "styled-components";

export const StyledHeader = styled.header`
	&& {
		position: relative;
		margin-bottom: 55px;
		padding: 20px 8px;
		z-index: 4;
		background-color: ${({ theme }) => theme?.colors?.white};

		.logo {
			@media (max-width: 565px) {
				display: block;
				margin: 0 auto;
			}
		}

		.header__nav {
			position: absolute;
			top: 28px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 4;
			@media (max-width: 1200px) {
				transform: translateX(0%);
				position: relative;
				left: 0;
				top: 0;
			}
			@media (max-width: 565px) {
				width: 100%;
			}
		}
		a {
			font-size: ${({ theme }) => theme?.fontSizes?.h4};
		}
		.header__item {
			padding: 8px;
			cursor: pointer;
			&:hover {
				a {
					color: ${({theme}) => theme?.colors?.green};
				}
			}
		}
		.header__categories {
			position: absolute;
			border-top: 1px solid ${({ theme }) => theme?.colors?.grey};
			top: 80px;
			left: 0;
			width: 100%;
			padding: 40px 16px;
			z-index: 3;
			box-shadow: 0 30px 20px rgba(0, 0, 0, 0.2);
			border-radius: ${({ theme }) => theme?.borders?.borderRadius};
			background-color: ${({ theme }) => theme?.colors?.white};
			pointer-events: auto;
		}
		.search-input {
			@media (max-width: 992px){
				width: 100%;
				justify-content: center;
			}
		}
		.header__container {
			@media (max-width: 992px){
				gap: 12px;
			}
		}
	}
`;

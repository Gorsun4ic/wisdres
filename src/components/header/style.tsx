import styled from "styled-components";

export const StyledHeader = styled.header`
	&& {
		position: relative;
		margin-bottom: 55px;
		padding: 20px 8px;
		z-index: 4;
		background-color: ${({ theme }) => theme?.colors?.white};

		.header__nav {
			position: absolute;
			top: 28px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 4;
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
	}
`;

import styled from "styled-components";

export const StyledHero = styled.div`
	&& {
		margin-bottom: 60px;
		span {
			position: absolute;
			font-size: ${({ theme }) => theme?.fontSizes?.h1};
			z-index: 3;
			background-color: ${({ theme }) => theme?.colors?.white};
			padding: 41px 57px 58px 56px;
		}
		.swiper-wrapper {
			-webkit-transition-timing-function: linear !important;
			transition-timing-function: linear !important;
		}
		.top {
			position: relative;
			margin-bottom: 20px;
			span {
				left: 116px;
			}
		}
		.bottom {
			position: relative;
			span {
				right: 259px;
			}
		}
	}
`;

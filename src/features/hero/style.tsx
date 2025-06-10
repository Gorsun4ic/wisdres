import styled from "styled-components";

export const StyledHero = styled.div`
	&& {
		margin-bottom: 60px;
		@media (max-width: 768px) {
			text-align: center;
		}
		span {
			position: absolute;
			font-size: ${({ theme }) => theme?.fontSizes?.h1};
			z-index: 3;
			background-color: ${({ theme }) => theme?.colors?.white};
			padding: 41px 57px 58px 56px;
			@media (max-width: 768px) {
				position: relative;
				padding: 0;
			}
			@media (max-width: 500px) {
				font-size: ${({ theme }) => theme?.fontSizes?.h2};
			}
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
				@media (max-width: 768px) {
					left: 0;
				}
			}
		}
		.bottom {
			position: relative;
			span {
				right: 259px;
				@media (max-width: 768px) {
					right: 0;
				}
			}
		}
	}
`;

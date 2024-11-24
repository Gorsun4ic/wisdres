import styled from "styled-components";

export const StyledThumb = styled.div`
	&& {
		display: flex;
		max-width: 480px;
		gap: 70px;
		.swiper-thumbs {
			max-height: 395px;
			max-width: 100px;
			margin-bottom: 18px;
		}
		.thumbs {
			text-align: center;
			max-width: 135px;
			width: 100%;
			p {
				font-size: 14px;
			}
		}
	}
`;

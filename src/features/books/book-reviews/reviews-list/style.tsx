import styled from "styled-components";

export const StyledReviewsList = styled.div`
	&& {
		max-width: 550px;
		h3 {
			margin-bottom: 24px;
		}
		.review__item {
			margin-bottom: 24px;

			p,
			span,
			time {
				color: ${({ theme }) => theme?.colors?.grey};
			}
		}

		.review__text {
			line-height: 1.5;
		}
	}
`;
import styled from "styled-components";

export const StyledReviewsList = styled.div`
	&& {
		max-width: 550px;

		@media (max-width: 768px) {
			max-width: none;
		}

		h3 {
			margin-bottom: 24px;
		}
		.review__item {
			margin-bottom: 24px;
			min-width: 300px;
			word-break: break-word;
			.review__heading {
				margin-bottom: 4px;
			}
			.review__rating {
				margin-bottom: 10px;
			}
			.review__text {
				line-height: 1.5;
			}
			p,
			span,
			time {
				color: ${({ theme }) => theme?.colors?.grey};
			}
		}
	}
`;

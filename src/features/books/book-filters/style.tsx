import styled from "styled-components";

export const StyledBookFilters = styled.aside`
	&& {
		max-width: 260px;
		width: 100%;
		min-width: 250px;
		padding: 12px;
		border-radius: ${({theme}) => theme?.borders?.borderRadius};
		border: 1px solid ${({ theme }) => theme?.colors?.darkGrey};

		& > span {
			color: ${({ theme }) => theme?.colors?.grey};
			text-align: center;
			display: block;
			font-size: ${({ theme }) => theme?.fontSizes?.h3};
			margin-bottom: 14px;
			font-weight: ${({ theme }) => theme?.fontWeights?.medium};
		}
	}
`;
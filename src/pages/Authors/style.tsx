import styled from "styled-components";

export const StyledAuthorsPage = styled.div`
	&& {
		h1 {
			margin-bottom: 30px;
			text-align: center;
		}
		.search-bar {
			max-width: 600px;
			width: 100%;
			margin: 0 auto 60px;
			.MuiFormControl-root{
				width: 100%;
			}
		}

		.authors-list {
			margin: 0 auto;
		}
	}
`
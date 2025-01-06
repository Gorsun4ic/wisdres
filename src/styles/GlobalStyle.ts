import { createGlobalStyle } from "styled-components";
import theme from "@styles/theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Oswald:wght@200..700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		  font-family: "Instrument Sans", sans-serif;
  }

  p {
    font-size: ${theme?.fontSizes?.default}
  }

  h1,h2,h3, h4 {
    font-weight: ${theme?.fontWeights?.regular};
  }

  h1 {
    font-size: ${theme?.fontSizes?.h1};
  }

  h2 {
    font-size: ${theme?.fontSizes?.h2};
  }

  h3 {
    font-size: ${theme?.fontSizes?.h3};
  }

    h4 {
    font-size: ${theme?.fontSizes?.h4};
  }

  a {
    text-decoration: none;
    color: ${theme?.colors?.black};
    transition: color 0.3s ease;
    			&:hover {
				color: ${theme?.colors?.green};
			}
  }

  /* For inputs make */
  .MuiOutlinedInput-root {
			fieldset {
				border-color: ${theme?.colors?.grey} !important;
        border-width: 1px !important;
			}
    }

  .visually-hidden {
    			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			border: 0;
			padding: 0;

			white-space: nowrap;
			clip-path: inset(100%);
			clip: rect(0 0 0 0);
			overflow: hidden;
  }

  .error {
    color: ${({theme}) => theme?.colors?.red};
  }

`;

export default GlobalStyle;

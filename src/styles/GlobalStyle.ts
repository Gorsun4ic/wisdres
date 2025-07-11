import { createGlobalStyle } from "styled-components";
import {scTheme} from "@styles/theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Oswald:wght@200..700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		  font-family: "Instrument Sans", sans-serif;
  }

  p {
    font-size: ${scTheme?.fontSizes?.default}
  }

  h1,h2,h3, h4 {
    font-weight: ${scTheme?.fontWeights?.regular};
  }

  h1 {
    font-size: ${scTheme?.fontSizes?.h1};
    @media (max-width: 1200px) {
      font-size: ${scTheme?.fontSizes?.h2};

    }
  }

  h2 {
    font-size: ${scTheme?.fontSizes?.h2};
    @media (max-width: 1200px) {
      font-size: ${scTheme?.fontSizes?.h3};

    }
  }

  h3 {
    font-size: ${scTheme?.fontSizes?.h3};
    @media (max-width: 1200px) {
      font-size: ${scTheme?.fontSizes?.h4};

    }
  }

    h4 {
    font-size: ${scTheme?.fontSizes?.h4};
  }

  a {
    text-decoration: none;
    color: ${scTheme?.colors?.black};
    transition: color 0.3s ease;
    			&:hover {
				color: ${scTheme?.colors?.green};
			}
  }

  /* For inputs make */
  .MuiOutlinedInput-root {
			fieldset {
				border-color: ${scTheme.colors.grey} !important;
        border-width: 1px !important;
			}
    }

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  appearance: none;
  background-color: white !important;
  box-shadow: 0 0 0px 1000px white inset !important; /* Force override */
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
    color: ${({ theme }) => theme?.colors?.red};
  }

  .success {
    color: ${({ theme }) => theme?.colors?.green};
  }
`;

export default GlobalStyle;

import GlobalStyle from "@styles/GlobalStyle";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "@styles/theme";
import BookReviews from "@features/books/book-reviews";

function App() {
	return (
		<>
			<GlobalStyle />
			<StyledThemeProvider theme={theme}>
				<BookReviews />
			</StyledThemeProvider>
		</>
	);
}

export default App;

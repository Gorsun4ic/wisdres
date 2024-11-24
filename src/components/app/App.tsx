import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Container } from "@mui/material";
import GlobalStyle from "@styles/GlobalStyle";
import theme from "@styles/theme";
// Pages
import BookPage from "@pages/Book";
import MainPage from "@pages/Main";

function App() {
	return (
		<>
			<GlobalStyle />
			<StyledThemeProvider theme={theme}>
				<Container
					maxWidth="lg"
					sx={{
						"&.MuiContainer-maxWidthLg": {
							maxWidth: "1248px",
						},
					}}>
					<Router>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/book" element={<BookPage />} />
						</Routes>
					</Router>
				</Container>
			</StyledThemeProvider>
		</>
	);
}

export default App;
